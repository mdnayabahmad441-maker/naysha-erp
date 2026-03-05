import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const teacher = await prisma.teacher.findFirst({
      where: { id: 1 } // temporary until login system
    });

    if (!teacher || !teacher.classId) {
      return NextResponse.json([]);
    }

    const students = await prisma.student.findMany({
      where: {
        classId: teacher.classId
      }
    });

    return NextResponse.json(students);

  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}