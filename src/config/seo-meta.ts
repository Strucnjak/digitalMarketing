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
    title: "Performance marketing agencija Crna Gora | DIAL",
    description:
      "Performance marketing, Google Ads, Meta Ads, SEO, sajtovi usmjereni na konverzije, analitika i CRM sistemi za kompanije kojima su potrebni kvalifikovani leadovi i jasniji ROI.",
    images: SOCIAL_IMAGE_BY_LOCALE.me,
  },
  en: {
    title: "Performance Marketing Agency Montenegro | DIAL",
    description:
      "Performance marketing, Google Ads, Meta Ads, SEO, conversion-focused websites, analytics and CRM systems for businesses that need qualified leads and clearer ROI.",
    images: SOCIAL_IMAGE_BY_LOCALE.en,
  },
  fr: {
    title: "Agence de marketing à la performance au Monténégro | DIAL",
    description:
      "Marketing à la performance, Google Ads, Meta Ads, SEO, sites axés sur la conversion, analytique et CRM pour générer des leads qualifiés et clarifier le ROI.",
    images: SOCIAL_IMAGE_BY_LOCALE.fr,
  },
};

const DEFAULT_SEO_METADATA = DEFAULT_SEO_METADATA_BY_LOCALE[defaultLocale];

const SEO_METADATA: Record<Locale, Partial<Record<PageType, SeoMetadata>>> = {
  me: {
    home: {
      title: "Performance marketing agencija Crna Gora | DIAL",
      description:
        "Performance marketing, Google Ads, Meta Ads, SEO, sajtovi usmjereni na konverzije, analitika i CRM sistemi za kompanije kojima su potrebni kvalifikovani leadovi i jasniji ROI.",
    },
    "web-design": {
      title: "Web dizajn i razvoj u Crnoj Gori | DIAL",
      description:
        "Sajtovi i landing stranice usmjereni na konverzije, izgrađeni za brzinu, vidljivost u pretrazi, praćenje i generisanje leadova.",
    },
    seo: {
      title: "SEO usluge Crna Gora | Tehnički i lokalni SEO | DIAL",
      description:
        "Tehnički, on-page i lokalni SEO usmjeren na relevantnu namjeru pretrage, dostupnost pretraživačima, strukturu sadržaja i održivu organsku vidljivost.",
    },
    "social-media": {
      title: "Meta Ads i marketing na društvenim mrežama | DIAL",
      description:
        "Strategija plaćenih društvenih mreža, Meta Ads upravljanje, testiranje publike i kreativnih rješenja te mjerenje usmjereno na relevantnu potražnju i kvalifikovane upite.",
    },
    branding: {
      title: "Brending i grafički dizajn u Crnoj Gori | DIAL",
      description:
        "Identitet brenda, smjernice i kreativna rješenja za kampanje koja održavaju poruku dosljednom na webu, u plaćenim medijima i prodajnim materijalima.",
    },
    strategy: {
      title: "Strategija digitalnog marketinga Crna Gora | DIAL",
      description:
        "Revizije akvizicije, planiranje kanala, arhitektura mjerenja i CRM/mapiranje izvora za kompanije kojima je potrebna jasnija strategija digitalnog marketinga.",
    },
    "analytics-tracking-crm": {
      title: "Analitika, praćenje i CRM | DIAL",
      description: "GA4, GTM, praćenje konverzija, mapiranje izvora i CRM struktura koja povezuje marketinške kampanje sa kvalitetom leadova i poslovnim rezultatima.",
    },
    "service-inquiry": {
      title: "Razgovarajte o projektu digitalnog marketinga | DIAL",
      description:
        "Podijelite obim projekta, postojeću postavku i poslovni cilj kako bi DIAL preporučio odgovarajući angažman i sljedeći korak.",
    },
    "free-consultation": {
      title: "Zakažite strateški razgovor o digitalnom marketingu | DIAL",
      description:
        "Razgovarajte o akviziciji, sajtu, praćenju ili generisanju leadova tokom fokusiranog uvodnog strateškog razgovora od 45 minuta, bez naknade i obaveze.",
    },
  },
  fr: {
    home: {
      title:
        "Agence de marketing à la performance au Monténégro | DIAL",
      description:
        "Marketing à la performance, Google Ads, Meta Ads, SEO, sites axés sur la conversion, analytique et CRM pour générer des leads qualifiés et clarifier le ROI.",
    },
    "web-design": {
      title: "Conception et développement web au Monténégro | DIAL",
      description:
        "Sites et landing pages axés sur la conversion, conçus pour la rapidité, la visibilité dans les moteurs de recherche, le suivi et la génération de leads.",
    },
    seo: {
      title: "Services SEO au Monténégro | SEO technique et local | DIAL",
      description:
        "SEO technique, on-page et local axé sur les intentions pertinentes, l’explorabilité, la structure du contenu et une visibilité organique durable.",
    },
    "social-media": {
      title: "Meta Ads et marketing sur les réseaux sociaux | DIAL",
      description:
        "Stratégie social ads, gestion Meta Ads, tests d’audience et créatifs, et mesure axée sur une demande pertinente et des prospects qualifiés.",
    },
    branding: {
      title: "Identité de marque et design graphique au Monténégro | DIAL",
      description:
        "Identité, charte et créations de campagne conçues pour maintenir la cohérence du message sur le web, dans les médias payants et les supports commerciaux.",
    },
    strategy: {
      title: "Stratégie de marketing digital au Monténégro | DIAL",
      description:
        "Audits d’acquisition, planification des canaux, architecture de mesure et cartographie CRM/des sources pour clarifier votre stratégie de marketing digital.",
    },
    "analytics-tracking-crm": {
      title: "Analytics, suivi des conversions & CRM | DIAL",
      description: "GA4, GTM, suivi des conversions, attribution des sources et architecture CRM pour relier les campagnes à la qualité des leads et aux résultats commerciaux.",
    },
    "service-inquiry": {
      title: "Discuter d’un projet de marketing digital | DIAL",
      description:
        "Partagez le périmètre, la configuration actuelle et l’objectif commercial afin que DIAL recommande la mission et la prochaine étape adaptées.",
    },
    "free-consultation": {
      title: "Réserver un échange stratégique en marketing digital | DIAL",
      description:
        "Échangez sur vos priorités d’acquisition, de site, de suivi ou de génération de leads lors d’un entretien initial ciblé de 45 minutes, sans frais ni engagement.",
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
    "analytics-tracking-crm": {
      title: "Marketing Analytics, Tracking & CRM | DIAL",
      description: "GA4, GTM, conversion tracking, source mapping and CRM lead architecture that connect campaign activity with lead quality and commercial outcomes.",
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
