import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function test() {
  const all = await prisma.serviceInquiry.findMany();
  console.log("✅ Success:", all);
}

test().catch((e) => console.error("❌ Prisma error:", e));
