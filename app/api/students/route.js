import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



/* GET STUDENTS */
export async function GET(req) {

  try {

    const { searchParams } = new URL(req.url);

    const classId = searchParams.get("classId");



    const students = await prisma.student.findMany({

      where: classId
        ? { classId: Number(classId) }
        : {},

      include: {
        class: true
      },

      orderBy: {
        name: "asc"
      }

    });



    return NextResponse.json(students);

  } catch (error) {

    console.error("Fetch students error:", error);

    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );

  }

}



/* CREATE STUDENT */
export async function POST(req) {

  try {

    const body = await req.json();



    const student = await prisma.student.create({

      data: {
        name: body.name,
        rollNumber: body.rollNumber || null,
        phone: body.phone || null,
        email: body.email || null,
        address: body.address || null,
        classId: Number(body.classId),
        schoolId: 1
      }

    });



    return NextResponse.json(student);

  } catch (error) {

    console.error("Create student error:", error);

    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );

  }

}