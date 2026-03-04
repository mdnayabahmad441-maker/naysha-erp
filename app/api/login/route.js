import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {

  const body = await req.json();
  const { email, password } = body;

  console.log("LOGIN ATTEMPT:", email, password);

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    console.log("USER NOT FOUND");
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const match = await bcrypt.compare(password, user.password);

  console.log("PASSWORD MATCH:", match);

  if (!match) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    success: true,
    role: user.role
  });

  response.cookies.set("userId", user.id.toString());
  response.cookies.set("role", user.role);

  return response;
}