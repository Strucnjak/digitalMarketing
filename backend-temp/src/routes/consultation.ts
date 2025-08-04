import express from 'express';
import { PrismaClient } from '@prisma/client';

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

router.post('/', async (req, res) => {
  const data = req.body as ConsultationFormData;

  try {
    await prisma.consultationRequest.create({
      data: {
        ...data,
        interestedServices: data.interestedServices ?? [],
      },
    });

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to submit consultation request' });
  }
});

export default router;
