import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { plan } = await req.json();

  let price;

  if (plan === "basic") price = 1999;
  if (plan === "growth") price = 3999;
  if (plan === "pro") price = 7999;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `Naysha ERP ${plan} plan`,
          },
          unit_amount: price * 100,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],

    mode: "subscription",

    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/register`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  });

  return NextResponse.json({ url: session.url });
}