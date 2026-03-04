import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {

  try {

    const body = await req.json();

    const feeId = Number(body.feeId);
    const amount = Number(body.amount);

    if (!feeId || !amount) {
      return NextResponse.json(
        { error: "Missing feeId or amount" },
        { status: 400 }
      );
    }

    const fee = await prisma.fee.findUnique({
      where: { id: feeId }
    });

    if (!fee) {
      return NextResponse.json(
        { error: "Fee not found" },
        { status: 404 }
      );
    }

    // CREATE PAYMENT
    const payment = await prisma.payment.create({
      data: {
        feeId: feeId,
        amount: amount,
        schoolId: fee.schoolId
      }
    });

    // UPDATE FEE
    const newPaidAmount = fee.paidAmount + amount;

    let status = "Partial";

    if (newPaidAmount >= fee.totalAmount) {
      status = "Paid";
    }

    await prisma.fee.update({
      where: { id: feeId },
      data: {
        paidAmount: newPaidAmount,
        status: status
      }
    });

    return NextResponse.json(payment);

  } catch (error) {

    console.error("Payment Error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  }

}