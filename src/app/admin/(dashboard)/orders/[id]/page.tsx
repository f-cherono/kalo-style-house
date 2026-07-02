import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

type OrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/orders" className="text-sm text-foreground/50 hover:text-accent">
        ← Back to Orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl tracking-wide">
          ORDER #{order.id.slice(-8).toUpperCase()}
        </h1>
        <OrderStatusSelect orderId={order.id} status={order.status} />
      </div>

      <p className="mt-2 text-sm text-foreground/50">
        Placed on {order.createdAt.toLocaleString()}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg tracking-wide">ITEMS</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-widest text-foreground/50">
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-foreground/70">{item.size ?? "—"}</td>
                    <td className="px-4 py-3 text-foreground/70">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end text-base font-semibold">
            Total: {formatPrice(order.total)}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg tracking-wide">CUSTOMER</h2>
          <div className="mt-4 space-y-1 text-sm text-foreground/70">
            <p className="font-medium text-foreground">{order.name}</p>
            <p>{order.email}</p>
          </div>

          <h2 className="font-display mt-6 text-lg tracking-wide">SHIPPING ADDRESS</h2>
          <div className="mt-4 space-y-1 text-sm text-foreground/70">
            <p>{order.address}</p>
            <p>
              {order.city}, {order.postalCode}
            </p>
            <p>{order.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
