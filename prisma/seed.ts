import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME || "admin";
  const password = process.env.SEED_ADMIN_PASSWORD || "adminpassword123";
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || "12");

  const existing = await prisma.user.findUnique({ where: { Username: username } });
  if (existing) {
    console.log("Admin already exists:", username);
    return;
  }

  const hash = await bcrypt.hash(password, saltRounds);

  const admin = await prisma.user.create({
    data: {
      Username: username,
      PasswordHash: hash,
      Role: Role.ADMIN,
      Name: "Admin"
    }
  });

  console.log("Seeded admin:", admin.Username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
