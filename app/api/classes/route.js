import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const classes = await prisma.class.findMany({
    where: {
      schoolId: user.schoolId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(classes);
}

export async function POST(req) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, section } = await req.json();

  const newClass = await prisma.class.create({
    data: {
      name,
      section,
      schoolId: user.schoolId,
    },
  });

  return NextResponse.json(newClass);
}