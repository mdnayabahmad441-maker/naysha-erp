import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const id = parseInt(params.id);
  const body = await req.json();

  const updated = await prisma.class.update({
    where: { id },
    data: {
      name: body.name,
      section: body.section,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const id = parseInt(params.id);

  await prisma.class.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}