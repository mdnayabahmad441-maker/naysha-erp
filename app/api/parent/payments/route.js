import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req){

const studentId = Number(req.cookies.get("studentId")?.value);

const payments = await prisma.payment.findMany({
where:{ studentId },
orderBy:{ createdAt:"desc" }
});

return NextResponse.json(payments);

}