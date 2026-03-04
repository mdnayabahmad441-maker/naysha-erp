import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req){

const studentId = Number(req.cookies.get("studentId")?.value);

const attendance = await prisma.attendance.findMany({
where:{ studentId },
orderBy:{ date:"desc" }
});

return NextResponse.json(attendance);

}