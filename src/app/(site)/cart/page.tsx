"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl tracking-wide sm:text-5xl">YOUR CART</h1>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-foreground/60">Your cart is empty.</p>
          <Link
            href="/shop"
            className="rounded-full bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:opacity-90"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ul className="divide-y divide-border border-y border-border">
              {items.map((item) => (
                <li key={`${item.productId}-${item.size}`} className="flex gap-4 py-6">
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          href={`/shop/${item.slug}`}
                          className="font-medium hover:text-accent"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-foreground/50">Size {item.size}</p>
                      </div>
                      <p className="whitespace-nowrap font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-border">
                        <button
                          type="button"
                          className="px-3 py-1.5 text-sm"
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-[1.5ch] text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1.5 text-sm"
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.size)}
                        className="text-sm text-foreground/50 hover:text-accent"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-fit rounded-lg border border-border p-6">
            <h2 className="font-display text-lg tracking-wide">ORDER SUMMARY</h2>
            <div className="mt-4 flex justify-between text-sm text-foreground/60">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-foreground/60">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-full bg-accent py-3 text-center text-sm font-semibold uppercase tracking-wide text-black transition hover:opacity-90"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/shop"
              className="mt-3 block w-full rounded-full border border-border py-3 text-center text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
