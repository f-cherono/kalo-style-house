import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

export type ProductCardData = {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-end justify-center bg-black/0 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
          <span className="mb-4 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black">
            View Product
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-foreground/50">
            {product.category}
          </p>
          <h3 className="mt-1 text-sm font-medium">{product.name}</h3>
        </div>
        <p className="whitespace-nowrap text-sm font-semibold">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
