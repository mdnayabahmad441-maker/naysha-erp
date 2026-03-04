import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req){

try{

const body = await req.json();

const template = await prisma.feeTemplate.create({

data:{
classId:Number(body.classId),
studentType:body.studentType,

schoolFee:Number(body.schoolFee || 0),
transportFee:Number(body.transportFee || 0),
hostelFee:Number(body.hostelFee || 0),
miscFee:Number(body.miscFee || 0),

schoolId:1
}

});

return NextResponse.json(template);

}catch(error){

console.error(error);

return NextResponse.json(
{error:"Failed"},
{status:500}
);

}

}