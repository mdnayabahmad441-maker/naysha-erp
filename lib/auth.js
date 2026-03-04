import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const userId = cookies().get("userId")?.value;

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  return user;
}