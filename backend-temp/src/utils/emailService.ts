import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type Language = 'me' | 'en';
type Payload = Record<string, string>;

const locales = {
  contact: {
    subject: {
      me: 'Nova poruka sa kontakt forme',
      en: 'New contact form message',
    },
    body: {
      me: (p: Payload) => `Ime: ${p.name}\nEmail: ${p.email}\nPoruka: ${p.message}`,
      en: (p: Payload) => `Name: ${p.name}\nEmail: ${p.email}\nMessage: ${p.message}`,
    },
  },
  consultation: {
    subject: {
      me: 'Zahtev za konsultaciju',
      en: 'Consultation request',
    },
    body: {
      me: (p: Payload) => `Ime: ${p.name}\nEmail: ${p.email}\nTelefon: ${p.phone}`,
      en: (p: Payload) => `Name: ${p.name}\nEmail: ${p.email}\nPhone: ${p.phone}`,
    },
  },
  serviceInquiry: {
    subject: {
      me: 'Upit za uslugu',
      en: 'Service inquiry',
    },
    body: {
      me: (p: Payload) => `Ime: ${p.name}\nUsluga: ${p.service}\nDetalji: ${p.details}`,
      en: (p: Payload) => `Name: ${p.name}\nService: ${p.service}\nDetails: ${p.details}`,
    },
  },
};

export async function sendContactEmail(payload: Payload, language: Language) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: locales.contact.subject[language],
    text: locales.contact.body[language](payload),
  });
}

export async function sendConsultationEmail(payload: Payload, language: Language) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: locales.consultation.subject[language],
    text: locales.consultation.body[language](payload),
  });
}

export async function sendServiceInquiryEmail(payload: Payload, language: Language) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: locales.serviceInquiry.subject[language],
    text: locales.serviceInquiry.body[language](payload),
  });
}

