import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const product = await prisma.product.create({
      data: {
        slug: body.slug,
        name: body.name,
        description: body.description,
        price: Math.round(Number(body.price)),
        category: body.category,
        image: body.image,
        images: JSON.stringify(body.images ?? []),
        sizes: JSON.stringify(body.sizes ?? []),
        stock: Math.round(Number(body.stock)),
        featured: Boolean(body.featured),
      },
    });
    return NextResponse.json({ product });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not create product.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
