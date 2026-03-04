import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req){

try{

const body = await req.json();
const month = body.month;

const students = await prisma.student.findMany({
include:{
class:true
}
});

let created = 0;

for(const student of students){

const template = await prisma.feeTemplate.findFirst({
where:{
classId: student.classId,
studentType: student.studentType
}
});

if(!template) continue;

const schoolFee = template.schoolFee || 0;
const transportFee = template.transportFee || 0;
const hostelFee = template.hostelFee || 0;
const miscFee = template.miscFee || 0;

const totalAmount =
schoolFee +
transportFee +
hostelFee +
miscFee;

await prisma.fee.create({
data:{
studentId: student.id,

schoolFee,
transportFee,
hostelFee,
miscFee,

totalAmount,

paidAmount:0,
status:"Unpaid",

schoolId:student.schoolId,

invoiceNumber:`INV-${Date.now()}-${student.id}`,

month
}
});

created++;

}

return NextResponse.json({
message:"Monthly fees generated",
total:created
});

}catch(error){

console.error(error);

return NextResponse.json(
{error:"Failed"},
{status:500}
);

}

}