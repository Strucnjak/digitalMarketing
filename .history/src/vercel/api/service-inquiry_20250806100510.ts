import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";
import { sendServiceInquiryEmail } from '../utils/emailService';

interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  selectedService: string;
  selectedPackage: string;
  projectTypes: string[];
  currentSituation: string;
  projectGoals: string;
  targetAudience: string;
  timeline: string;
  budget: string;
  additionalServices: string[];
  preferredContact: string;
  additionalInfo: string;
  howDidYouHear: string;
  newsletter: boolean;
}

const prisma = (globalThis as any).prisma ?? new PrismaClient();
if (!(globalThis as any).prisma) {
  (globalThis as any).prisma = prisma;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { language = "en", ...data } = (req.body ?? {}) as InquiryFormData & {
    language?: "me" | "en";
  };

  try {
    const formData = await prisma.serviceInquiry.create({
      data: {
        ...data,
        projectTypes: Array.isArray(data.projectTypes)
          ? data.projectTypes
          : [],
        additionalServices: Array.isArray(data.additionalServices)
          ? data.additionalServices
          : [],
      },
    });

    try {
      await sendServiceInquiryEmail(formData, language);
    } catch (emailErr) {
      console.error("Failed to send service inquiry emails", emailErr);
    }

    return res.json({ message: "Service inquiry submitted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to submit service inquiry" });
  }
}
