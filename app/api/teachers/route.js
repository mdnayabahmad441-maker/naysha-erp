import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teachers = await prisma.teacher.findMany({
    where: {
      schoolId: user.schoolId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(teachers);
}

export async function POST(req) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, phone } = await req.json();

  const teacher = await prisma.teacher.create({
    data: {
      name,
      email,
      phone,
      schoolId: user.schoolId,
    },
  });

  return NextResponse.json(teacher);
}