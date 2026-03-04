import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { classId, date, records } = body;

    if (!classId || !date || !records) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    // Check if attendance already exists for this class + date
    const existing = await prisma.attendance.findFirst({
      where: {
        classId: parseInt(classId),
        date: new Date(date),
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Attendance already marked" },
        { status: 400 }
      );
    }

    // Create attendance records
    const createPromises = Object.entries(records).map(
      ([studentId, status]) =>
        prisma.attendance.create({
          data: {
            studentId: parseInt(studentId),
            classId: parseInt(classId),
            date: new Date(date),
            status,
          },
        })
    );

    await Promise.all(createPromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Attendance Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}