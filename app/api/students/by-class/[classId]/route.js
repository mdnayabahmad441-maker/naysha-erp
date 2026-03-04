import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req,{ params }) {

  try {

    const classId = Number(params.classId);

    const students = await prisma.student.findMany({
      where:{
        classId:classId
      },
      orderBy:{
        name:"asc"
      }
    });

    return NextResponse.json(students);

  } catch (error) {

    console.error("FETCH STUDENTS BY CLASS ERROR:",error);

    return NextResponse.json(
      { error:"Failed to fetch students"},
      { status:500 }
    );

  }

}