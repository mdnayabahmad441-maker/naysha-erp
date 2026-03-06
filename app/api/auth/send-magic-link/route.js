import jwt from "jsonwebtoken";
import { transporter } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req){

const { email } = await req.json();

const token = jwt.sign(
  { email },
  process.env.JWT_SECRET,
  { expiresIn:"10m" }
);

const link = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/magic-login?token=${token}`;

await transporter.sendMail({
  to:email,
  subject:"Login to Naysha ERP",
  text:`Click this link to login: ${link}`
});

return NextResponse.json({success:true});

}