import { defaultLocale, type Locale, type PageType } from "../routing";
import { SITE_BASE_URL } from "./site";

export interface SeoMetadata {
  title: string;
  description: string;
  images?: string[];
}

const SOCIAL_IMAGE_BY_LOCALE: Record<Locale, string[]> = {
  me: [`${SITE_BASE_URL}/social-share-me.svg`],
  en: [`${SITE_BASE_URL}/social-share-en.svg`],
};

const DEFAULT_SEO_METADATA: SeoMetadata = {
  title: "DIAL Digital Agency",
  description:
    "DIAL Digital is a full-service digital agency delivering design, marketing, and growth solutions.",
  images: SOCIAL_IMAGE_BY_LOCALE[defaultLocale],
};

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
  en: {
    home: {
      title: "DIAL Digital Agency | Digital Marketing & Web Design in Montenegro",
      description:
        "DIAL Digital is a full-service digital agency delivering design, marketing, and growth solutions across Montenegro.",
    },
    "web-design": {
      title: "Web Design & Development | DIAL Digital Agency",
      description:
        "We craft modern, responsive websites that are optimized for conversions and business growth.",
    },
    seo: {
      title: "SEO Services in Montenegro | DIAL Digital Agency",
      description:
        "Increase your search visibility and win more clients with our comprehensive SEO services.",
    },
    "social-media": {
      title: "Social Media Marketing Services | DIAL Digital Agency",
      description:
        "Grow your brand community and engagement with data-driven social media strategies.",
    },
    branding: {
      title: "Branding & Graphic Design | DIAL Digital Agency",
      description:
        "Build a memorable visual identity with bespoke branding and design solutions from our creative team.",
    },
    strategy: {
      title: "Digital Strategy & Consulting | DIAL Digital Agency",
      description:
        "Develop a data-driven digital strategy that accelerates growth and delivers measurable results.",
    },
    "service-inquiry": {
      title: "Request a Project Quote | DIAL Digital Agency",
      description:
        "Tell us about your project and receive a tailored proposal from the DIAL Digital team within 24 hours.",
    },
    "free-consultation": {
      title: "Book a Free Consultation | DIAL Digital Agency",
      description:
        "Schedule a free consultation with our digital experts to discover growth opportunities for your business.",
    },
  },
};

export function getSeoMetadata(locale: Locale, page: PageType): SeoMetadata {
  const localized = SEO_METADATA[locale]?.[page];
  if (localized) {
    return withSeoDefaults(locale, localized);
  }

  const fallback = SEO_METADATA[defaultLocale]?.[page];
  if (fallback) {
    return withSeoDefaults(locale, fallback);
  }

  return withSeoDefaults(locale, DEFAULT_SEO_METADATA);
}

function withSeoDefaults(locale: Locale, metadata: SeoMetadata): SeoMetadata {
  const localeImages = SOCIAL_IMAGE_BY_LOCALE[locale] ?? SOCIAL_IMAGE_BY_LOCALE[defaultLocale] ?? [];
  return {
    ...metadata,
    images: metadata.images ?? localeImages,
  };
}

export { DEFAULT_SEO_METADATA, SEO_METADATA };
