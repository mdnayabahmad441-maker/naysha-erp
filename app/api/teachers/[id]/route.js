import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const id = parseInt(params.id);
  const body = await req.json();

  const updated = await prisma.teacher.update({
    where: { id },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      classId: body.classId
        ? parseInt(body.classId)
        : null,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const id = parseInt(params.id);

  await prisma.teacher.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}