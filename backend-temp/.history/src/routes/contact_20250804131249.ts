import express from "express";
import { PrismaClient } from "@prisma/client";
import { sendContactEmail } from "../utils/emailService";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, company, phone, message, language = "en" } = req.body;
  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = "Name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  }
  if (!message) {
    errors.message = "Message is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

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
    return res.status(500).json({ errors: { server: "Failed to save message" } });
  }
});

export default router;
