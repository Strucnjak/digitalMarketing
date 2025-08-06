import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";
import { sendContactEmail } from '../src/vercel/utils/emailService';

const prisma = (globalThis as any).prisma ?? new PrismaClient();
if (!(globalThis as any).prisma) {
  (globalThis as any).prisma = prisma;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, company, phone, message, language = "en" } = req.body ?? {};

  try {
    const formData = await prisma.contactMessage.create({
      data: { name, email, company, phone, message },
    });

    try {
      await sendContactEmail(
        {
          name: formData.name ?? "",
          email: formData.email ?? "",
          company: formData.company ?? "",
          phone: formData.phone ?? "",
          message: formData.message ?? "",
        },
        language
      );
    } catch (emailErr) {
      console.error("Failed to send contact emails", emailErr);
    }

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to save message" });
  }
}
