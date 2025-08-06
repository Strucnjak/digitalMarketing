// /api/contact.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";
import { sendContactEmail } from "../src/vercel/utils/emailService";

const prisma = new PrismaClient();

function sanitizeInput(value: unknown) {
  return typeof value === "string" ? value.replace(/[<>]/g, "").trim() : "";
}

function validateContactData(data: Record<string, unknown>) {
  const sanitized = {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    company: sanitizeInput(data.company),
    phone: sanitizeInput(data.phone),
    message: sanitizeInput(data.message),
  };

  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+()\-\s]{7,20}$/;

  if (!sanitized.name) errors.push("name");
  if (!emailRegex.test(sanitized.email)) errors.push("email");
  if (!sanitized.company) errors.push("company");
  if (!phoneRegex.test(sanitized.phone)) errors.push("phone");
  if (!sanitized.message) errors.push("message");

  return { sanitized, errors };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { sanitized, errors } = validateContactData(req.body ?? {});
  const { language = "en" } = req.body ?? {};

  if (errors.length) {
    return res.status(400).json({ error: "Invalid input", fields: errors });
  }

  try {
    await prisma.contactMessage.create({ data: sanitized });

    try {
      await sendContactEmail(sanitized, language);
    } catch (emailErr) {
      console.error("Failed to send contact emails:", emailErr);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: "Failed to save message" });
  }
}
