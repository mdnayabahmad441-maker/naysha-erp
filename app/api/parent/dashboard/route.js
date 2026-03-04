import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req){

const studentId = req.cookies.get("studentId")?.value;

if(!studentId){
return NextResponse.json({error:"Not logged in"},{status:401});
}

const student = await prisma.student.findUnique({
where:{ id:Number(studentId) },
include:{ class:true }
});

const fees = await prisma.fee.findMany({
where:{ studentId:Number(studentId) }
});

const payments = await prisma.payment.findMany({
where:{ studentId:Number(studentId) },
orderBy:{ createdAt:"desc" },
take:5
});

let totalFees = 0;
let paid = 0;

fees.forEach(f=>{
totalFees += f.totalAmount;
paid += f.paidAmount;
});

const pendingFees = totalFees - paid;

return NextResponse.json({
student,
payments,
pendingFees
});

}