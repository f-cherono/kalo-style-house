"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md transform flex-col border-l border-border bg-background transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-display text-lg tracking-wide">YOUR CART</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="text-foreground/60 hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-foreground/60">Your cart is empty.</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li key={`${item.productId}-${item.size}`} className="flex gap-4 py-4">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <p className="text-sm font-medium">{item.name}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.size)}
                          aria-label="Remove item"
                          className="text-foreground/40 hover:text-accent"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-foreground/50">Size {item.size}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-border">
                          <button
                            type="button"
                            className="px-2 py-1 text-sm"
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="min-w-[1.5ch] text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            className="px-2 py-1 text-sm"
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-foreground/60">Subtotal</span>
                <span className="text-base font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full rounded-full bg-accent py-3 text-center text-sm font-semibold text-black transition hover:opacity-90"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-2 block w-full rounded-full border border-border py-3 text-center text-sm font-semibold transition hover:border-accent hover:text-accent"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
