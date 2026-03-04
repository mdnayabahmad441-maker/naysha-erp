import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.subscriptionPlan.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(plans);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch plans" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const plan = await prisma.subscriptionPlan.create({
    data: {
      name: body.name,
      priceMonthly: body.priceMonthly,
      priceYearly: body.priceYearly,
      studentLimit: body.studentLimit,
      teacherLimit: body.teacherLimit,
      features: body.features || {},
    },
  });

  return NextResponse.json(plan);
}