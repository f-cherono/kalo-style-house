"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  stock: number;
};

export function AddToCartForm({ productId, slug, name, price, image, sizes, stock }: Props) {
  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizes.length === 1 ? sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }
    setError(null);
    addItem({ productId, slug, name, price, image, size: selectedSize }, quantity);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  const outOfStock = stock <= 0;

  return (
    <div className="mt-8">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/50">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setError(null);
              }}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedSize === size
                  ? "border-accent bg-accent text-black"
                  : "border-border text-foreground/70 hover:border-accent hover:text-accent"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
          Quantity
        </p>
        <div className="flex items-center gap-3 rounded-full border border-border">
          <button
            type="button"
            className="px-3 py-1.5 text-sm"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-[1.5ch] text-center text-sm">{quantity}</span>
          <button
            type="button"
            className="px-3 py-1.5 text-sm"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={outOfStock}
        className="mt-6 w-full rounded-full bg-accent py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {outOfStock ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
