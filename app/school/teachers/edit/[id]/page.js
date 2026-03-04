import { prisma } from "@/lib/prisma";
import EditTeacherForm from "./EditTeacherForm";

export default async function EditPage({ params }) {
  const id = parseInt(params.id);

  const teacher = await prisma.teacher.findUnique({
    where: { id },
  });

  const classes = await prisma.class.findMany({
    where: { schoolId: 1 },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Edit Teacher
      </h1>

      <EditTeacherForm teacher={teacher} classes={classes} />
    </div>
  );
}