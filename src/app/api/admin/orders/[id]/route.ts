import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["pending", "paid", "shipped", "cancelled"];

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const { status } = await req.json();

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  try {
    const order = await prisma.order.update({ where: { id }, data: { status } });
    return NextResponse.json({ order });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not update order.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
