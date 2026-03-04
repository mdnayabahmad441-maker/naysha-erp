import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getUser";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({}, { status: 401 });
  }

  const id = parseInt(params.id);
  const body = await req.json();

  const student = await prisma.student.findFirst({
    where: {
      id,
      schoolId: user.schoolId,
    },
  });

  if (!student) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  const updated = await prisma.student.update({
    where: { id },
    data: {
      name: body.name,
      rollNo: body.rollNo,
      phone: body.phone || null,
      email: body.email || null,
      classId: body.classId
        ? parseInt(body.classId)
        : null,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({}, { status: 401 });
  }

  const id = parseInt(params.id);

  const student = await prisma.student.findFirst({
    where: {
      id,
      schoolId: user.schoolId,
    },
  });

  if (!student) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  await prisma.student.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}