import { prisma } from "@/lib/prisma";
import EditClassForm from "./EditClassForm";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const id = parseInt(params.id);

  if (isNaN(id)) return notFound();

  const classData = await prisma.class.findUnique({
    where: { id },
  });

  if (!classData) return notFound();

  return <EditClassForm classData={classData} />;
}