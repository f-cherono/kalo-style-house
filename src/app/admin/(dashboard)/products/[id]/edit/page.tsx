import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  let images: string[] = [];
  let sizes: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {}
  try {
    sizes = JSON.parse(product.sizes);
  } catch {}

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">EDIT PRODUCT</h1>
      <div className="mt-8">
        <ProductForm
          initial={{
            id: product.id,
            slug: product.slug,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image,
            images,
            sizes,
            stock: product.stock,
            featured: product.featured,
          }}
        />
      </div>
    </div>
  );
}
