import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {

  const { plan } = await req.json();

  const prices = {
    basic: 1999,
    growth: 3999,
    pro: 7999
  };

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `Naysha ERP ${plan}`
          },
          unit_amount: prices[plan] * 100,
          recurring: {
            interval: "month"
          }
        },
        quantity: 1
      }
    ],

    mode: "subscription",

    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`

  });

  return NextResponse.json({ url: session.url });
}