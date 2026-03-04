import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: number };

    if (!decoded?.userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    return user;
  } catch (error) {
    console.log("GET USER ERROR:", error);
    return null;
  }
}