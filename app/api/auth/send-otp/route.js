import jwt from "jsonwebtoken";
import { transporter } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req){

  const { email } = await req.json();

  const otp = Math.floor(100000 + Math.random()*900000).toString();

  const token = jwt.sign(
    { email, otp },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  await transporter.sendMail({
    to: email,
    subject: "Naysha ERP Verification",
    text: `Your OTP is ${otp}`
  });

  return NextResponse.json({ token });

}