import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const classId = parseInt(searchParams.get("classId"));
  const date = new Date(searchParams.get("date"));

  const records = await prisma.attendance.findMany({
    where: { classId, date },
    include: { student: true },
  });

  return NextResponse.json(records);
}

export async function PUT(req) {
  const updates = await req.json();

  const updatePromises = updates.map((r) =>
    prisma.attendance.update({
      where: { id: r.id },
      data: { status: r.status },
    })
  );

  await Promise.all(updatePromises);

  return NextResponse.json({ success: true });
}