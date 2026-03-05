import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req){

const { phone,password } = await req.json();

const parent = await prisma.parent.findUnique({
where:{ phone }
});

if(!parent){
return NextResponse.json({error:"Parent not found"},{status:401});
}

const valid = await bcrypt.compare(password,parent.password);

if(!valid){
return NextResponse.json({error:"Invalid password"},{status:401});
}

const token = jwt.sign(
{ id:parent.id, role:"PARENT" },
process.env.JWT_SECRET,
{ expiresIn:"7d" }
);

const res = NextResponse.json({success:true});

res.cookies.set("token",token,{
httpOnly:true,
path:"/"
});

return res;

}