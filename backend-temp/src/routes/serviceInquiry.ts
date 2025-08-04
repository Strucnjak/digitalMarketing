import express from 'express';
import { PrismaClient } from '@prisma/client';
import { sendServiceInquiryEmail } from '../utils/emailService';

const prisma = new PrismaClient();
const router = express.Router();

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

router.post('/', async (req, res) => {
  const { language = 'en', ...data } = req.body as InquiryFormData & {
    language?: 'me' | 'en';
  };

  try {
    const formData = await prisma.serviceInquiry.create({
      data: {
        ...data,
        projectTypes: data.projectTypes ?? [],
        additionalServices: data.additionalServices ?? [],
      },
    });

    try {
      await sendServiceInquiryEmail(
        {
          name: formData.fullName,
          email: formData.email,
          service: formData.selectedService,
          details: formData.projectGoals,
        },
        language,
      );
    } catch (emailErr) {
      console.error('Failed to send service inquiry emails', emailErr);
    }

    return res.json({ message: 'Service inquiry submitted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to submit service inquiry' });
  }
});

export default router;
