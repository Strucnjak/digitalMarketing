import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, company, phone, message } = req.body;
  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = 'Name is required';
  }
  if (!email) {
    errors.email = 'Email is required';
  }
  if (!message) {
    errors.message = 'Message is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    await prisma.contactMessage.create({
      data: { name, email, company, phone, message },
    });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: { server: 'Failed to save message' } });
  }
});

export default router;
