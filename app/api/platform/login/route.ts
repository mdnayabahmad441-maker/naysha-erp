import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken({
      userId: user.id,
      role: user.role,
      schoolId: user.schoolId,
    });

const response = NextResponse.json({
  success: true,
  role: user.role,
});

    response.cookies.set("platform_token", token, {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}