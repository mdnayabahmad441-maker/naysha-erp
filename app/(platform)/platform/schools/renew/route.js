import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const schoolId = params.id;

  // Get latest subscription
  const latest = await prisma.schoolSubscription.findFirst({
    where: { schoolId },
    orderBy: { startDate: "desc" },
  });

  if (!latest) {
    return NextResponse.redirect(
      new URL("/platform/schools", request.url)
    );
  }

  const newStart = new Date();
  const newEnd = new Date();
  newEnd.setMonth(newEnd.getMonth() + 1);

  await prisma.schoolSubscription.create({
    data: {
      schoolId,
      planName: latest.planName,
      price: latest.price,
      startDate: newStart,
      endDate: newEnd,
      status: "ACTIVE",
    },
  });

  return NextResponse.redirect(
    new URL("/platform/schools", request.url)
  );
}