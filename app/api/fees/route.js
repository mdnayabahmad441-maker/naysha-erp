import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const fees = await prisma.fee.findMany({
      include: {
        student: true
      },
      orderBy: {
        id: "desc"
      }
    });

    return NextResponse.json(fees);

  } catch (error) {

    console.error("Fees GET Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch fees" },
      { status: 500 }
    );

  }
}


export async function POST(req) {

  try {

    const body = await req.json();

    const studentId = Number(body.studentId);

    const schoolFee = Number(body.schoolFee) || 0;
    const hostelFee = Number(body.hostelFee) || 0;
    const transportFee = Number(body.transportFee) || 0;
    const miscFee = Number(body.miscFee) || 0;
    const otherCharges = Number(body.otherCharges) || 0;

    const totalAmount =
      schoolFee +
      hostelFee +
      transportFee +
      miscFee +
      otherCharges;

    // 🔹 Generate invoice number
    const invoiceNumber =
      "INV-" +
      Date.now() +
      "-" +
      Math.floor(Math.random() * 1000);


    const fee = await prisma.fee.create({

      data: {

        studentId,

        invoiceNumber,

        schoolFee,
        hostelFee,
        transportFee,
        miscFee,
        otherCharges,

        totalAmount,

        paidAmount: 0,

        status: "Unpaid",

        schoolId: 1,

        dueDate: new Date()

      }

    });

    return NextResponse.json(fee);

  } catch (error) {

    console.error("Create Fee Error FULL:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  }

}