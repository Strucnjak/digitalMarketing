import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
  try {
    const all = await prisma.serviceInquiry.findMany();
    console.log("✅ Success:", all);
  } catch (e) {
    console.error("❌ Prisma error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
