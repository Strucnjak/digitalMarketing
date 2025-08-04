import express from "express";
import { PrismaClient } from "@prisma/client";
import { sendConsultationEmail } from "../utils/emailService";

const prisma = new PrismaClient();
const router = express.Router();

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

router.post("/", async (req, res) => {
  const { language = "en", ...data } = req.body as ConsultationFormData & {
    language?: "me" | "en";
  };

  try {
    const formData = await prisma.consultationRequest.create({
      data: {
        ...data,
        interestedServices: data.interestedServices ?? [],
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
});

export default router;
