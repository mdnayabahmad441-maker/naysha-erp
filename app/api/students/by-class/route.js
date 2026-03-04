import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {

  const { searchParams } = new URL(req.url);
  const classId = Number(searchParams.get("classId"));

  if (!classId) {
    return NextResponse.json(
      { error: "ClassId missing" },
      { status: 400 }
    );
  }

  const students = await prisma.student.findMany({
    where: {
      classId: classId
    },
    orderBy: {
      name: "asc"
    }
  });

  return NextResponse.json(students);

}