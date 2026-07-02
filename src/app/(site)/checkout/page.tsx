"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            size: i.size,
            quantity: i.quantity,
          })),
          customer: form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Could not reach checkout. Please try again.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl tracking-wide">YOUR CART IS EMPTY</h1>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:opacity-90"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl tracking-wide sm:text-5xl">CHECKOUT</h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-2">
          <div>
            <h2 className="font-display text-lg tracking-wide">CONTACT</h2>
            <input
              required
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="mt-3 w-full rounded border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <h2 className="font-display text-lg tracking-wide">SHIPPING ADDRESS</h2>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Full name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="rounded border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none sm:col-span-2"
              />
              <input
                required
                placeholder="Street address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className="rounded border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none sm:col-span-2"
              />
              <input
                required
                placeholder="City"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="rounded border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <input
                required
                placeholder="Postal code"
                value={form.postalCode}
                onChange={(e) => update("postalCode", e.target.value)}
                className="rounded border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <input
                required
                placeholder="Country"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                className="rounded border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none sm:col-span-2"
              />
            </div>
          </div>

          {error && (
            <div className="rounded border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Redirecting to payment…" : `Pay ${formatPrice(subtotal)}`}
          </button>
          <p className="text-center text-xs text-foreground/40">
            Payments are securely processed by Stripe. You&apos;ll be redirected to
            complete payment.
          </p>
        </form>

        <div className="h-fit rounded-lg border border-border p-6">
          <h2 className="font-display text-lg tracking-wide">ORDER SUMMARY</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-foreground/70">
                  {item.name} × {item.quantity}{" "}
                  <span className="text-foreground/40">(Size {item.size})</span>
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
