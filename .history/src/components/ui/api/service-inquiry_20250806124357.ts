import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";
import { sendServiceInquiryEmail } from "../src/vercel/utils/emailService";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        website: data.website,
        selectedService: data.selectedService,
        selectedPackage: data.selectedPackage,
        projectTypes: data.projectTypes ?? [],
        currentSituation: data.currentSituation,
        projectGoals: data.projectGoals,
        targetAudience: data.targetAudience,
        timeline: data.timeline,
        budget: data.budget,
        additionalServices: data.additionalServices ?? [],
        preferredContact: data.preferredContact,
        additionalInfo: data.additionalInfo,
        howDidYouHear: data.howDidYouHear,
        newsletter: data.newsletter,
      },
    });

    try {
      await sendServiceInquiryEmail(formData, language);
    } catch (emailErr) {
      console.error("Failed to send service inquiry emails", emailErr);
    }

    return res.status(200).json({ message: "Service inquiry submitted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Failed to submit service inquiry" });
  }
}
