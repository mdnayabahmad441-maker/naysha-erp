import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {

const id = Number(params.id);

try {

const student = await prisma.student.findUnique({
where: { id },
include: {
class: true
}
});

const fees = await prisma.fee.findMany({
where: { studentId: id },
orderBy: { createdAt: "desc" },
include: {
payments: true
}
});

return NextResponse.json({
student,
fees
});

} catch (error) {

console.error(error);

return NextResponse.json(
{ error: "Failed to load ledger" },
{ status: 500 }
);

}

}