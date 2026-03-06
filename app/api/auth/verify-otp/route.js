import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {

  const { email, code } = await req.json();

  const record = await prisma.otp.findFirst({
    where: {
      email,
      code
    },
    orderBy: { id: "desc" }
  });

  if (!record) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  if (record.expiresAt < new Date()) {
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}