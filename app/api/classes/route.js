import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const classes = await prisma.class.findMany();
    return NextResponse.json(classes);
  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}