import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe, isStripeConfigured } from "@/lib/stripe";

type CheckoutBody = {
  items: { productId: string; size: string; quantity: number }[];
  customer: {
    email: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
};

export async function POST(req: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured yet. Add a real STRIPE_SECRET_KEY (test mode) to your .env file to enable checkout.",
      },
      { status: 503 }
    );
  }

  const body = (await req.json()) as CheckoutBody;
  const { items, customer } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }
  if (!customer?.email || !customer?.name || !customer?.address) {
    return NextResponse.json({ error: "Missing customer details." }, { status: 400 });
  }

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });
  const productMap = new Map(products.map((p) => [p.id, p]));

  let total = 0;
  const orderItemsData: {
    productId: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
  }[] = [];
  const lineItems: {
    price_data: {
      currency: string;
      product_data: { name: string; images: string[] };
      unit_amount: number;
    };
    quantity: number;
  }[] = [];

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) continue;
    const quantity = Math.max(1, Math.floor(item.quantity));
    total += product.price * quantity;

    orderItemsData.push({
      productId: product.id,
      name: product.name,
      size: item.size,
      price: product.price,
      quantity,
    });

    lineItems.push({
      price_data: {
        currency: "kes",
        product_data: {
          name: `${product.name} (${item.size})`,
          images: [product.image],
        },
        unit_amount: product.price,
      },
      quantity,
    });
  }

  if (orderItemsData.length === 0) {
    return NextResponse.json({ error: "No valid items in cart." }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      email: customer.email,
      name: customer.name,
      address: customer.address,
      city: customer.city,
      postalCode: customer.postalCode,
      country: customer.country,
      status: "pending",
      total,
      items: { create: orderItemsData },
    },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customer.email,
      line_items: lineItems,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      metadata: { orderId: order.id },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "cancelled" },
    });
    const message = err instanceof Error ? err.message : "Stripe checkout failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
