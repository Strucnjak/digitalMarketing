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
    internal: {
      subject: {
        me: 'Nova poruka sa kontakt forme',
        en: 'New contact form message',
      },
      body: {
        me: (p: Payload) => `Ime: ${p.name}\nEmail: ${p.email}\nPoruka: ${p.message}`,
        en: (p: Payload) => `Name: ${p.name}\nEmail: ${p.email}\nMessage: ${p.message}`,
      },
    },
    confirmation: {
      subject: {
        me: 'Potvrda kontakt poruke',
        en: 'Contact message received',
      },
      body: {
        me: (p: Payload) =>
          `Poštovani ${p.name}, hvala što ste nas kontaktirali. Vaša poruka je primljena.`,
        en: (p: Payload) =>
          `Dear ${p.name}, thank you for contacting us. We have received your message.`,
      },
    },
  },
  consultation: {
    internal: {
      subject: {
        me: 'Zahtev za konsultaciju',
        en: 'Consultation request',
      },
      body: {
        me: (p: Payload) => `Ime: ${p.name}\nEmail: ${p.email}\nTelefon: ${p.phone}`,
        en: (p: Payload) => `Name: ${p.name}\nEmail: ${p.email}\nPhone: ${p.phone}`,
      },
    },
    confirmation: {
      subject: {
        me: 'Potvrda zahteva za konsultaciju',
        en: 'Consultation request received',
      },
      body: {
        me: () =>
          'Vaš zahtev za konsultaciju je primljen. Uskoro ćemo vas kontaktirati.',
        en: () =>
          'Your consultation request has been received. We will contact you soon.',
      },
    },
  },
  serviceInquiry: {
    internal: {
      subject: {
        me: 'Upit za uslugu',
        en: 'Service inquiry',
      },
      body: {
        me: (p: Payload) => `Ime: ${p.name}\nUsluga: ${p.service}\nDetalji: ${p.details}`,
        en: (p: Payload) => `Name: ${p.name}\nService: ${p.service}\nDetails: ${p.details}`,
      },
    },
    confirmation: {
      subject: {
        me: 'Potvrda upita za uslugu',
        en: 'Service inquiry received',
      },
      body: {
        me: () =>
          'Vaš upit za uslugu je primljen. Uskoro ćemo vam odgovoriti.',
        en: () => 'Your service inquiry has been received. We will reply shortly.',
      },
    },
  },
};

export async function sendContactEmail(payload: Payload, language: Language) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: locales.contact.internal.subject[language],
    text: locales.contact.internal.body[language](payload),
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: payload.email,
    subject: locales.contact.confirmation.subject[language],
    text: locales.contact.confirmation.body[language](payload),
  });
}

export async function sendConsultationEmail(payload: Payload, language: Language) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: locales.consultation.internal.subject[language],
    text: locales.consultation.internal.body[language](payload),
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: payload.email,
    subject: locales.consultation.confirmation.subject[language],
    text: locales.consultation.confirmation.body[language](payload),
  });
}

export async function sendServiceInquiryEmail(payload: Payload, language: Language) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: locales.serviceInquiry.internal.subject[language],
    text: locales.serviceInquiry.internal.body[language](payload),
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: payload.email,
    subject: locales.serviceInquiry.confirmation.subject[language],
    text: locales.serviceInquiry.confirmation.body[language](payload),
  });
}

