import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { AddToCartForm } from "@/components/product/AddToCartForm";
import { ProductCard } from "@/components/product/ProductCard";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return {};
  return {
    title: `${product.name} — KALO_STYLE HOUSE`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) notFound();

  const images: string[] = (() => {
    try {
      const parsed = JSON.parse(product.images);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [product.image];
    } catch {
      return [product.image];
    }
  })();

  const sizes: string[] = (() => {
    try {
      const parsed = JSON.parse(product.sizes);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const related = await prisma.product.findMany({
    where: { category: product.category, NOT: { id: product.id } },
    take: 4,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 text-xs uppercase tracking-widest text-foreground/50">
        <Link href="/shop" className="hover:text-accent">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-accent">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((img, idx) => (
            <div
              key={img + idx}
              className={`relative aspect-[4/5] overflow-hidden rounded-lg bg-muted ${
                images.length === 1 ? "sm:col-span-2" : ""
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} image ${idx + 1}`}
                fill
                priority={idx === 0}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {product.category}
          </p>
          <h1 className="font-display mt-2 text-4xl tracking-wide sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold">{formatPrice(product.price)}</p>
          <p className="mt-6 max-w-lg text-foreground/70">{product.description}</p>

          <AddToCartForm
            productId={product.id}
            slug={product.slug}
            name={product.name}
            price={product.price}
            image={product.image}
            sizes={sizes}
            stock={product.stock}
          />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display mb-8 text-2xl tracking-wide sm:text-3xl">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={{
                  slug: p.slug,
                  name: p.name,
                  price: p.price,
                  image: p.image,
                  category: p.category,
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
