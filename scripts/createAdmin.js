import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

async function main() {

  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@school.com",
      password: password,
      role: "ADMIN",
      schoolId: 1
    }
  });

  console.log("✅ Admin user created");

}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });