import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req){

  const { otp, token } = await req.json();

  try{

    const data = jwt.verify(token, process.env.JWT_SECRET);

    if(data.otp !== otp){
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success:true,
      email:data.email
    });

  }catch(err){

    return NextResponse.json(
      { error:"OTP expired" },
      { status:400 }
    );

  }

}