import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.role !== "SCHOOL_ADMIN") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({
    userId: user.id,
    schoolId: user.schoolId,
    role: user.role,
  });

  const response = NextResponse.json({ success: true });

  response.cookies.set("school_token", token, {
    httpOnly: true,
    path: "/",
  });

  return response;
}