import { defaultLocale, type Locale, type PageType } from "../routing";
import { SITE_BASE_URL } from "./site";

export interface SeoMetadata {
  title: string;
  description: string;
  images?: string[];
}

const SOCIAL_IMAGE_BY_LOCALE: Record<Locale, string[]> = {
  me: [`${SITE_BASE_URL}/social-share-me.svg`],
  fr: [`${SITE_BASE_URL}/social-share-en.svg`],
  en: [`${SITE_BASE_URL}/social-share-en.svg`],
};

const DEFAULT_SEO_METADATA_BY_LOCALE: Record<Locale, SeoMetadata> = {
  me: {
    title: "DIAL Digital agencija",
    description:
      "DIAL Digital je digitalna agencija iz Crne Gore za dizajn, marketing i strategiju.",
    images: SOCIAL_IMAGE_BY_LOCALE.me,
  },
  en: {
    title: "Performance Marketing Agency Montenegro | DIAL",
    description:
      "Performance marketing, Google Ads, Meta Ads, SEO, conversion-focused websites, analytics and CRM systems for businesses that need qualified leads and clearer ROI.",
    images: SOCIAL_IMAGE_BY_LOCALE.en,
  },
  fr: {
    title: "Agence DIAL Digital",
    description:
      "DIAL Digital est une agence digitale au Monténégro spécialisée dans le design, le marketing et la stratégie.",
    images: SOCIAL_IMAGE_BY_LOCALE.fr,
  },
};

const DEFAULT_SEO_METADATA = DEFAULT_SEO_METADATA_BY_LOCALE[defaultLocale];

const SEO_METADATA: Record<Locale, Partial<Record<PageType, SeoMetadata>>> = {
  me: {
    home: {
      title: "DIAL Digital agencija | Digitalni marketing i web dizajn",
      description:
        "DIAL Digital je full-service digitalna agencija iz Crne Gore koja isporučuje dizajn, marketing i strategije rasta.",
    },
    "web-design": {
      title: "Web dizajn i development | DIAL Digital agencija",
      description:
        "Pravimo moderne, responzivne sajtove optimizovane za konverzije i rast vašeg biznisa.",
    },
    seo: {
      title: "SEO usluge u Crnoj Gori | DIAL Digital agencija",
      description:
        "Povećajte vidljivost na pretraživačima i osvojite više klijenata uz naš SEO tim.",
    },
    "social-media": {
      title: "Upravljanje društvenim mrežama | DIAL Digital agencija",
      description:
        "Gradimo vašu zajednicu i povećavamo angažman kroz kreativne kampanje na društvenim mrežama.",
    },
    branding: {
      title: "Brending i grafički dizajn | DIAL Digital agencija",
      description:
        "Razvijamo prepoznatljiv vizuelni identitet i profesionalne marketinške materijale za vaš brend.",
    },
    strategy: {
      title: "Digitalna strategija i konsalting | DIAL Digital agencija",
      description:
        "Planovi zasnovani na podacima koji ubrzavaju rast i prodaju vašeg poslovanja.",
    },
    "service-inquiry": {
      title: "Zatražite ponudu | DIAL Digital agencija",
      description:
        "Pošaljite detalje projekta i dobićete personalizovanu ponudu u roku od 24 sata.",
    },
    "free-consultation": {
      title: "Besplatne konsultacije | DIAL Digital agencija",
      description:
        "Rezervišite besplatan razgovor sa našim timom digitalnog marketinga i saznajte kako možemo pomoći.",
    },
  },
  fr: {
    home: {
      title:
        "Agence DIAL Digital | Marketing digital et conception web au Monténégro",
      description:
        "DIAL Digital est une agence full-service qui fournit des solutions de design, de marketing et de croissance au Monténégro.",
    },
    "web-design": {
      title: "Conception et développement web | Agence DIAL Digital",
      description:
        "Nous créons des sites modernes et responsives, optimisés pour la conversion et la croissance de votre entreprise.",
    },
    seo: {
      title: "Services SEO au Monténégro | Agence DIAL Digital",
      description:
        "Améliorez votre visibilité sur les moteurs de recherche et gagnez plus de clients grâce à notre équipe SEO.",
    },
    "social-media": {
      title: "Marketing des réseaux sociaux | Agence DIAL Digital",
      description:
        "Développez votre communauté et l'engagement grâce à des campagnes créatives sur les réseaux sociaux.",
    },
    branding: {
      title: "Branding et design graphique | Agence DIAL Digital",
      description:
        "Nous élaborons une identité visuelle distinctive et des supports marketing professionnels pour votre marque.",
    },
    strategy: {
      title: "Stratégie digitale et conseil | Agence DIAL Digital",
      description:
        "Des plans fondés sur les données qui accélèrent la croissance et les ventes de votre entreprise.",
    },
    "service-inquiry": {
      title: "Demander une proposition | Agence DIAL Digital",
      description:
        "Envoyez les détails de votre projet et recevez une proposition personnalisée en 24 heures.",
    },
    "free-consultation": {
      title: "Réservez une consultation gratuite | Agence DIAL Digital",
      description:
        "Planifiez un appel gratuit avec notre équipe marketing pour découvrir comment nous pouvons vous aider.",
    },
  },
  en: {
    home: {
      title:
        "Performance Marketing Agency Montenegro | DIAL",
      description:
        "Performance marketing, Google Ads, Meta Ads, SEO, conversion-focused websites, analytics and CRM systems for businesses that need qualified leads and clearer ROI.",
    },
    "web-design": {
      title: "Web Design & Development Montenegro | DIAL",
      description:
        "Conversion-focused websites and landing pages built for speed, search visibility, tracking and lead generation.",
    },
    seo: {
      title: "SEO Services Montenegro | Technical & Local SEO | DIAL",
      description:
        "Technical, on-page and local SEO focused on relevant search intent, crawlability, content structure and sustainable organic visibility.",
    },
    "social-media": {
      title: "Meta Ads & Social Media Marketing Montenegro | DIAL",
      description:
        "Paid-social strategy, Meta Ads management, audience testing, creative testing and measurement focused on relevant demand and qualified enquiries.",
    },
    branding: {
      title: "Branding & Graphic Design Montenegro | DIAL",
      description:
        "Brand identity, guidelines and campaign creative designed to keep your message consistent across web, paid media and sales materials.",
    },
    strategy: {
      title: "Digital Marketing Strategy Montenegro | DIAL",
      description:
        "Acquisition audits, channel planning, measurement architecture and CRM/source mapping for businesses that need a clearer digital marketing strategy.",
    },
    "service-inquiry": {
      title: "Discuss a Digital Marketing Project | DIAL",
      description:
        "Share your project scope, current setup and commercial objective so DIAL can recommend the right engagement and next step.",
    },
    "free-consultation": {
      title: "Book a Digital Marketing Strategy Call | DIAL",
      description:
        "Discuss your acquisition, website, tracking or lead-generation priorities in a focused 45-minute introductory strategy call with no fee or obligation.",
    },
  },
};

export function getSeoMetadata(locale: Locale, page: PageType): SeoMetadata {
  const localized = SEO_METADATA[locale]?.[page];
  if (localized) {
    return withSeoDefaults(locale, localized);
  }

  return withSeoDefaults(locale, DEFAULT_SEO_METADATA_BY_LOCALE[locale]);
}

function withSeoDefaults(locale: Locale, metadata: SeoMetadata): SeoMetadata {
  const localeImages =
    SOCIAL_IMAGE_BY_LOCALE[locale] ??
    SOCIAL_IMAGE_BY_LOCALE[defaultLocale] ??
    [];
  return {
    ...metadata,
    images: metadata.images ?? localeImages,
  };
}

export { DEFAULT_SEO_METADATA, SEO_METADATA };
