import { prisma } from "@/lib/prisma";
import AddTeacherForm from "./AddTeacherForm";

export default async function NewTeacherPage() {
  const classes = await prisma.class.findMany({
    where: { schoolId: 1 },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Add New Teacher
      </h1>

      <AddTeacherForm classes={classes} />
    </div>
  );
}