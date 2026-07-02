import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();

  try {
    const product = await prisma.product.update({
      where: { id },
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
    const message = err instanceof Error ? err.message : "Could not update product.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not delete product.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
