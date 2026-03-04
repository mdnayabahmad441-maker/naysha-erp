import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const classId = searchParams.get("classId");
  const date = searchParams.get("date");

  if (!classId || !date) {
    return NextResponse.json({ exists: false });
  }

  const existing = await prisma.attendance.findFirst({
    where: {
      classId: parseInt(classId),
      date: new Date(date),
    },
  });

  return NextResponse.json({
    exists: !!existing,
  });
}