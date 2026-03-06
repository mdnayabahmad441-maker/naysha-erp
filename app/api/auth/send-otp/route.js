import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req){

const { email } = await req.json();

const otp = Math.floor(100000 + Math.random()*900000).toString();

const expires = new Date(Date.now() + 5*60*1000);

await prisma.otp.create({
data:{
email,
code:otp,
expiresAt:expires
}
});

await transporter.sendMail({
to:email,
subject:"School ERP OTP Verification",
text:`Your OTP is ${otp}`
});

return NextResponse.json({success:true});

}