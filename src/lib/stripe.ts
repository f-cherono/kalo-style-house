import Stripe from "stripe";

const globalForStripe = globalThis as unknown as { stripe: Stripe | undefined };

export const stripe =
  globalForStripe.stripe ??
  new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
    apiVersion: "2026-06-24.dahlia",
  });

if (process.env.NODE_ENV !== "production") globalForStripe.stripe = stripe;

export function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY;
  return Boolean(key && key.startsWith("sk_") && !key.includes("placeholder"));
}
