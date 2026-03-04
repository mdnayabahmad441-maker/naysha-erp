import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req){

const studentId = Number(req.cookies.get("studentId")?.value);

const fees = await prisma.fee.findMany({
where:{ studentId },
orderBy:{ id:"desc" }
});

return NextResponse.json(fees);

}