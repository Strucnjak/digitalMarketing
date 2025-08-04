import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type Language = "me" | "en";
type Payload = Record<string, string>;

const translations: Record<Language, Record<string, string>> = {
  en: JSON.parse(readFileSync(path.join(__dirname, "../../../src/locales/en.json"), "utf-8")),
  me: JSON.parse(readFileSync(path.join(__dirname, "../../../src/locales/me.json"), "utf-8")),
};

function t(language: Language, key: string): string {
  return translations[language][key];
}

function format(template: string, payload: Payload) {
  return template.replace(/\{(\w+)\}/g, (_, k) => payload[k] ?? "");
}

const confirmationLocales = {
  contact: {
    subject: {
      me: "Potvrda kontakt poruke",
      en: "Contact message received",
    },
    body: {
      me: (p: Payload) => `Poštovani ${p.name}, hvala što ste nas kontaktirali. Vaša poruka je primljena.`,
      en: (p: Payload) => `Dear ${p.name}, thank you for contacting us. We have received your message.`,
    },
  },
  consultation: {
    subject: {
      me: "Potvrda zahteva za konsultaciju",
      en: "Consultation request received",
    },
    body: {
      me: () => "Vaš zahtev za konsultaciju je primljen. Uskoro ćemo vas kontaktirati.",
      en: () => "Your consultation request has been received. We will contact you soon.",
    },
  },
  serviceInquiry: {
    subject: {
      me: "Potvrda upita za uslugu",
      en: "Service inquiry received",
    },
    body: {
      me: () => "Vaš upit za uslugu je primljen. Uskoro ćemo vam odgovoriti.",
      en: () => "Your service inquiry has been received. We will reply shortly.",
    },
  },
};

export async function sendContactEmail(payload: Payload, language: Language) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: t(language, "email.contact.subject"),
    text: format(t(language, "email.contact.body"), payload),
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: payload.email,
    subject: confirmationLocales.contact.subject[language],
    text: confirmationLocales.contact.body[language](payload),
  });
}

export async function sendConsultationEmail(payload: Payload, language: Language) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: t(language, "email.consultation.subject"),
    text: format(t(language, "email.consultation.body"), payload),
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: payload.email,
    subject: confirmationLocales.consultation.subject[language],
    text: confirmationLocales.consultation.body[language](payload),
  });
}

export async function sendServiceInquiryEmail(payload: Payload, language: Language) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: t(language, "email.inquiry.subject"),
    text: format(t(language, "email.inquiry.body"), payload),
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: payload.email,
    subject: confirmationLocales.serviceInquiry.subject[language],
    text: confirmationLocales.serviceInquiry.body[language](payload),
  });
}
