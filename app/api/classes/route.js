import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {

  try {

    const classes = await prisma.class.findMany();

    return NextResponse.json(classes);

  } catch (error) {

    console.error("Classes API Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    );
  }

}