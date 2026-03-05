import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const teacher = await prisma.teacher.findFirst({
    where: { id: 1 },
  });

  const students = await prisma.student.findMany({
    where: {
      classId: teacher.classId,
    },
  });

  return NextResponse.json(students);
}