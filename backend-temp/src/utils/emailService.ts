import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // if using port 465 (SSL)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
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
      me: (p: Payload) => `Poštovani ${p.name}, vaš zahtev za konsultaciju je primljen. Uskoro ćemo vas kontaktirati.`,
      en: (p: Payload) => `Dear ${p.name}, your consultation request has been received. We will contact you soon.`,
    },
  },
  serviceInquiry: {
    subject: {
      me: "Potvrda upita za uslugu",
      en: "Service inquiry received",
    },
    body: {
      me: (p: Payload) => `Poštovani ${p.name}, vaš upit za uslugu je primljen. Uskoro ćemo vam odgovoriti.`,
      en: (p: Payload) => `Dear ${p.name}, your service inquiry has been received. We will reply shortly.`,
    },
  },
};

export async function sendContactEmail(payload: Payload, language: Language) {
  const body = format(t(language, "email.contact.body"), {
    name: payload.name,
    email: payload.email,
    company: payload.company,
    phone: payload.phone,
    message: payload.message,
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: t(language, "email.contact.subject"),
    text: body,
    html: body.replace(/\n/g, "<br/>"),
  });
  const confirmationBody = confirmationLocales.contact.body[language](payload);
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: payload.email,
    subject: confirmationLocales.contact.subject[language],
    text: confirmationBody,
    html: `<p>${confirmationBody}</p>`,
  });
}

export async function sendConsultationEmail(payload: Payload, language: Language) {
  const body = format(t(language, "email.consultation.body"), payload);
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: t(language, "email.consultation.subject"),
    text: body,
    html: body.split("\n").map((line) => `<p>${line}</p>`).join(""),
  });
  const confirmationBody = confirmationLocales.consultation.body[language](payload);
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: payload.email,
    subject: confirmationLocales.consultation.subject[language],
    text: confirmationBody,
    html: `<p>${confirmationBody}</p>`,
  });
}

export async function sendServiceInquiryEmail(
  payload: Record<string, unknown>,
  language: Language,
) {
  const normalized: Payload = {};
  for (const [key, value] of Object.entries(payload)) {
    if (Array.isArray(value)) {
      normalized[key] = value.join(', ');
    } else if (typeof value === 'boolean') {
      normalized[key] = value ? 'true' : 'false';
    } else if (value === null || value === undefined) {
      normalized[key] = '';
    } else {
      normalized[key] = String(value);
    }
  }

  const textBody = format(t(language, 'email.inquiry.body'), normalized);
  const htmlBody = `<table>${textBody
    .split('\\n')
    .map((line) => {
      const [label, ...rest] = line.split(':');
      const value = rest.join(':').trim();
      return `<tr><td><strong>${label}:</strong></td><td>${value}</td></tr>`;
    })
    .join('')}</table>`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: t(language, 'email.inquiry.subject'),
    text: textBody,
    html: htmlBody,
  });

  const confirmationPayload = { name: normalized.fullName } as Payload;
  const confirmationBody = confirmationLocales.serviceInquiry.body[language](
    confirmationPayload,
  );
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: normalized.email,
    subject: confirmationLocales.serviceInquiry.subject[language],
    text: confirmationBody,
    html: `<p>${confirmationBody}</p>`,
  });
}
