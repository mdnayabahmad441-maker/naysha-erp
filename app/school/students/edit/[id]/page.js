import { prisma } from "@/lib/prisma";
import EditStudentForm from "./EditStudentForm";
import { notFound } from "next/navigation";

export default async function EditPage({ params }) {
  const id = parseInt(params.id);

  if (isNaN(id)) return notFound();

  const student = await prisma.student.findUnique({
    where: { id },
  });

  if (!student) return notFound();

  const classes = await prisma.class.findMany({
    where: { schoolId: student.schoolId },
  });

  return (
    <EditStudentForm
      student={student}
      classes={classes}
    />
  );
}