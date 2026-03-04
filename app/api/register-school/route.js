import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  const hashed = await bcrypt.hash(data.password, 10);

  const school = await prisma.school.create({
    data: {
      name: data.schoolName,
    },
  });

  await prisma.user.create({
    data: {
      name: data.adminName,
      email: data.email,
      password: hashed,
      role: "ADMIN",
      schoolId: school.id,
    },
  });

  return NextResponse.json({ success: true });
}