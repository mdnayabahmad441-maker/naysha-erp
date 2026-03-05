import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {

  const body = await req.json();

  const schoolId = 1;

  const teacher = await prisma.teacher.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      classId: body.classId ? Number(body.classId) : null,
      schoolId
    }
  });

  // create login account for teacher

  if (body.email) {

    const hashedPassword = await bcrypt.hash("teacher123", 10);

    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: "TEACHER",
        schoolId
      }
    });

  }

  return NextResponse.json(teacher);

}