import { prisma } from "./prisma";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  return user;
}