import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req) {

  const { email } = await req.json();

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const expires = new Date(Date.now() + 5 * 60 * 1000);

  await prisma.otp.create({
    data: {
      email,
      code,
      expiresAt: expires
    }
  });

  await transporter.sendMail({
    to: email,
    subject: "Naysha ERP Verification",
    text: `Your OTP is ${code}`
  });

  return NextResponse.json({ success: true });
}