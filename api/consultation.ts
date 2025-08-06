import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";
import { sendConsultationEmail } from "../src/vercel/utils/emailService";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}

interface ConsultationFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  businessType: string;
  currentChallenges: string;
  goals: string;
  interestedServices: string[];
  preferredContact: string;
  preferredTime: string;
  additionalInfo: string;
  newsletter: boolean;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { language = "en", ...data } = (req.body ?? {}) as ConsultationFormData & {
    language?: "me" | "en";
  };

  try {
    const formData = await prisma.consultationRequest.create({
      data: {
        ...data,
        interestedServices: Array.isArray(data.interestedServices) ? data.interestedServices : [],
      },
    });

    try {
      await sendConsultationEmail(
        {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          website: formData.website,
          businessType: formData.businessType,
          currentChallenges: formData.currentChallenges,
          goals: formData.goals,
          interestedServices: Array.isArray(formData.interestedServices) ? formData.interestedServices.join(", ") : "",
          preferredContact: formData.preferredContact,
          preferredTime: formData.preferredTime,
          additionalInfo: formData.additionalInfo,
          newsletter: formData.newsletter ? (language === "me" ? "Da" : "Yes") : language === "me" ? "Ne" : "No",
        },
        language
      );
    } catch (emailErr) {
      console.error("Failed to send consultation emails", emailErr);
    }

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to submit consultation request" });
  }
}
