import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl tracking-wide">PAYMENT CANCELLED</h1>
      <p className="mt-4 text-foreground/60">
        Your payment was cancelled and you have not been charged. Your cart is
        still saved if you&apos;d like to try again.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/checkout"
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:opacity-90"
        >
          Try Again
        </Link>
        <Link
          href="/cart"
          className="rounded-full border border-border px-8 py-3 text-sm font-semibold uppercase tracking-wide transition hover:border-accent hover:text-accent"
        >
          Back to Cart
        </Link>
      </div>
    </div>
  );
}
