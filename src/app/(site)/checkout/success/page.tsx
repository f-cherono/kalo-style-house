import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { formatPrice } from "@/lib/format";
import { ClearCartOnMount } from "@/components/cart/ClearCartOnMount";

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  let order = null;

  if (sessionId && isStripeConfigured()) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      order = await prisma.order.findUnique({
        where: { stripeSessionId: sessionId },
        include: { items: true },
      });

      if (order && session.payment_status === "paid" && order.status !== "paid") {
        order = await prisma.order.update({
          where: { id: order.id },
          data: { status: "paid" },
          include: { items: true },
        });
      }
    } catch {
      order = null;
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <ClearCartOnMount />
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-black">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h1 className="font-display text-4xl tracking-wide">ORDER CONFIRMED</h1>
      <p className="mt-4 text-foreground/60">
        Thank you{order?.name ? `, ${order.name}` : ""}. Your order has been placed
        successfully. A confirmation has been sent to{" "}
        {order?.email ?? "your email"}.
      </p>

      {order && (
        <div className="mt-10 rounded-lg border border-border p-6 text-left">
          <p className="text-xs uppercase tracking-widest text-foreground/50">
            Order #{order.id.slice(-8).toUpperCase()}
          </p>
          <ul className="mt-4 space-y-2">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-foreground/70">
                  {item.name} × {item.quantity} (Size {item.size})
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      )}

      <Link
        href="/shop"
        className="mt-10 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:opacity-90"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
