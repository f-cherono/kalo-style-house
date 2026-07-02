import { Suspense } from "react";
import type { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";
import { ShopFilters } from "@/components/product/ShopFilters";

export const metadata = {
  title: "Shop — KALO_STYLE HOUSE",
};

type ShopPageProps = {
  searchParams: Promise<{ category?: string; sort?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, sort } = await searchParams;

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "price-asc"
      ? { price: "asc" }
      : sort === "price-desc"
      ? { price: "desc" }
      : { createdAt: "desc" };

  const [products, categoryRows] = await Promise.all([
    prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy,
    }),
    prisma.product.findMany({
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    }),
  ]);

  const categories = categoryRows.map((row) => row.category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Shop All
        </p>
        <span className="mt-3 block h-px w-10 bg-gold" />
        <h1 className="font-display mt-3 text-4xl tracking-wide sm:text-5xl">
          THE COLLECTION
        </h1>
      </div>

      <Suspense fallback={<div className="h-10" />}>
        <ShopFilters categories={categories} />
      </Suspense>

      {products.length === 0 ? (
        <p className="mt-20 text-center text-foreground/60">
          No products found in this category.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
