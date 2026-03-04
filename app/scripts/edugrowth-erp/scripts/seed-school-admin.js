import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 👉 Change this email to the school you want to assign admin to
const schoolEmail = "mdnayabahmad441@gmail.com";

  const school = await prisma.school.findUnique({
    where: { email: schoolEmail },
  });

  if (!school) {
    console.log("❌ School not found. Create school first.");
    return;
  }

  const adminEmail = "admin@school.com";
  const plainPassword = "123456";

  // Check if already exists
  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    console.log("⚠️ School admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      role: "SCHOOL_ADMIN",
      schoolId: school.id,
    },
  });

  console.log("✅ School admin created successfully!");
  console.log("Email:", adminEmail);
  console.log("Password:", plainPassword);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });