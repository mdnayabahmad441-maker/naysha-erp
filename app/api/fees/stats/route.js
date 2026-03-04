import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){

const fees = await prisma.fee.findMany();

let totalFees = 0;
let collected = 0;

fees.forEach(f=>{
totalFees += f.totalAmount;
collected += f.paidAmount;
});

const pending = totalFees - collected;

return NextResponse.json({
totalFees,
collected,
pending
});

}