import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  {
    name: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
  },
  {
    name: "Perfumes",
    image: "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?w=800&q=80",
  },
  {
    name: "Wigs & Hair Extensions",
    image: "https://images.unsplash.com/photo-1634315775834-3e1ac73de6b6?w=800&q=80",
  },
  {
    name: "Wig Serum",
    image: "https://images.unsplash.com/photo-1747303969063-3b90bcb3942e?w=800&q=80",
  },
  {
    name: "Men's Wear",
    image: "https://images.unsplash.com/photo-1561756432-95ae6e06515e?w=800&q=80",
  },
  {
    name: "Women's Wear",
    image: "https://images.unsplash.com/photo-1544059529-9a9a0a4ef94f?w=800&q=80",
  },
  {
    name: "Kids' Wear",
    image: "https://images.unsplash.com/photo-1776127839720-c0ab710d9d37?w=800&q=80",
  },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1709417596263-a7a965e73314?w=1920&q=90";

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    where: { featured: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Clothes hanging on a line at KALO_STYLE HOUSE"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background from-15% via-background/55 via-45% to-transparent" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            New In
          </p>
          <span className="mb-4 mt-3 block h-px w-10 bg-gold" />
          <h1 className="font-display text-5xl leading-[0.95] tracking-wide sm:text-7xl lg:text-8xl">
            EVERYTHING
            <br />
            YOU NEED
          </h1>
          <p className="mt-6 max-w-md text-foreground/70">
            Hoodies, fragrances, wigs &amp; hair extensions, wig serum, and
            modest fashion for men, women &amp; kids — all under one roof.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:opacity-90"
            >
              Shop Now
            </Link>
            <Link
              href={`/shop?category=${encodeURIComponent("Women's Wear")}`}
              className="rounded-full border border-foreground/30 px-8 py-3 text-sm font-semibold uppercase tracking-wide transition hover:border-accent hover:text-accent"
            >
              Shop Women&apos;s Wear
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Featured
              </p>
              <span className="mt-3 block h-px w-10 bg-gold" />
              <h2 className="font-display mt-3 text-3xl tracking-wide sm:text-4xl">
                THIS WEEK&apos;S DROPS
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm font-medium uppercase tracking-wide text-foreground/60 hover:text-accent sm:block"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
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
        </section>
      )}

      {/* Categories */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Shop by Category
          </p>
          <span className="mt-3 block h-px w-10 bg-gold" />
          <h2 className="font-display mt-3 mb-10 text-3xl tracking-wide sm:text-4xl">
            FIND YOUR FIT
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/55" />
                <span className="absolute bottom-4 left-4 right-4 font-display text-base leading-tight tracking-wide text-on-photo sm:text-lg">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          The House
        </p>
        <span className="mx-auto mt-3 block h-px w-10 bg-gold" />
        <h2 className="font-display mt-3 text-3xl tracking-wide sm:text-4xl">
          EVERYTHING UNDER ONE ROOF.
        </h2>
        <p className="mt-6 text-foreground/60">
          KALO_STYLE HOUSE brings together the everyday essentials you
          actually reach for — hoodies, fragrance, wigs and hair
          extensions, wig serum, and modest fashion for men, women, and
          kids — all curated for quality, comfort, and real life.
        </p>
      </section>
    </div>
  );
}
