import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      address,
      city,
      planId,
      durationMonths,
    } = body;

    // 1️⃣ Create School
    const school = await prisma.school.create({
      data: {
        name,
        email,
        phone,
        address,
        city,
      },
    });

    // 2️⃣ Calculate Dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);

    // 3️⃣ Create Subscription
    await prisma.schoolSubscription.create({
      data: {
        schoolId: school.id,
        planId,
        status: "ACTIVE",
        startDate,
        endDate,
      },
    });

    return NextResponse.json({
      message: "School created successfully",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  const schools = await prisma.school.findMany({
    include: {
      subscriptions: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          plan: true,
        },
      },
    },
  });

  return NextResponse.json(schools);
}