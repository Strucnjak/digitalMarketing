import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'me';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  me: {
    // Navigation
    'nav.home': 'Početna',
    'nav.services': 'Usluge',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'O nama',
    'nav.contact': 'Kontakt',

    // Hero Section
    'hero.badge': '🚀 Digitalna agencija #1 u Crnoj Gori',
    'hero.title': 'Digitalni marketing koji radi',
    'hero.subtitle':
      'Transformišemo vaš biznis kroz moderne web stranice, SEO optimizaciju i strategije digitalnog marketinga koje donose rezultate.',
    'hero.cta': 'Počnite danas',
    'hero.secondary': 'Pogledajte radove',
    'hero.stats.clients': 'Zadovoljnih klijenata',
    'hero.stats.projects': 'Uspešnih projekata',
    'hero.stats.rating': 'Prosečna ocena',
    'hero.stats.response': 'Vreme odgovora',
    'hero.image_alt': 'Digitalni marketing dashboard',

    // Services
    'services.title': 'Naše usluge',
    'services.subtitle': 'Pružamo kompletna digitalna rješenja za vaš uspjeh',
    'services.web.title': 'Web dizajn i razvoj',
    'services.web.desc': 'Moderne, responzivne web stranice optimizovane za konverziju',
    'services.seo.title': 'SEO i Google Business',
    'services.seo.desc': 'Poboljšajte vidljivost i osvojite više klijenata preko pretrage',
    'services.social.title': 'Upravljanje društvenim mrežama',
    'services.social.desc': 'Strategije koje grade brendove i povećavaju angažovanje',
    'services.branding.title': 'Brendiranje i grafički dizajn',
    'services.branding.desc': 'Kreativna rješenja koja izdvajaju vaš brend',
    'services.strategy.title': 'Strategija i savjetovanje',
    'services.strategy.desc': 'Digitalne strategije usmjerene na rezultate',

    'services.heading.part1': 'Digitalne usluge za',
    'services.heading.emphasis': 'vaš uspeh',
    'services.description':
      'Od web development-a do kompletnih marketing strategija - pomažemo vašem biznisu da ostvari maksimalan potencijal u digitalnom svetu.',
    'services.learn_more': 'Saznajte više',
    'services.why.title.pre': 'Zašto odabrati',
    'services.why.title.post': '?',
    'services.why.desc':
      'Kombinujemo kreativnost sa tehnologijom da kreiramo rešenja koja ne samo da izgledaju odlično, već i donose merljive rezultate za vaš biznis.',
    'services.why.cta': 'Započnite projekat',
    'services.why.fast.title': 'Brza implementacija',
    'services.why.fast.desc': 'Projekti se završavaju u roku',
    'services.why.results.title': 'Merljivi rezultati',
    'services.why.results.desc': 'ROI koji možete videti',
    'services.why.support.title': 'Posvećena podrška',
    'services.why.support.desc': '24/7 tehnička podrška',
    'services.why.experience.title': 'Dokazano iskustvo',
    'services.why.experience.desc': '100+ uspešnih projekata',
    'services.web.feature1': 'Responzivni dizajn',
    'services.web.feature2': 'SEO optimizovano',
    'services.web.feature3': 'CMS integracija',
    'services.web.feature4': 'E-commerce',
    'services.seo.feature1': 'Keyword research',
    'services.seo.feature2': 'On-page SEO',
    'services.seo.feature3': 'Local SEO',
    'services.seo.feature4': 'Analytics',
    'services.social.feature1': 'Content creation',
    'services.social.feature2': 'Community management',
    'services.social.feature3': 'Paid advertising',
    'services.social.feature4': 'Analytics',
    'services.branding.feature1': 'Logo design',
    'services.branding.feature2': 'Brand guidelines',
    'services.branding.feature3': 'Print materials',
    'services.branding.feature4': 'Digital assets',
    'services.strategy.feature1': 'Market analysis',
    'services.strategy.feature2': 'Competitor research',
    'services.strategy.feature3': 'ROI optimization',
    'services.strategy.feature4': 'Growth strategy',

    // Portfolio
    'portfolio.title': 'Naš rad',
    'portfolio.subtitle': 'Pogledajte projekte koji su transformisali naše klijente',
    'portfolio.all': 'Sve kategorije',
    'portfolio.web': 'Web stranice',
    'portfolio.seo': 'SEO projekti',
    'portfolio.social': 'Društvene mreže',
    'portfolio.branding': 'Brendiranje',

    // About
    'about.title': 'O nama',
    'about.subtitle': 'Vaš partner za digitalni uspjeh u Crnoj Gori',
    'about.description':
      'BDigital je moderna digitalna agencija iz Crne Gore koja pomaže kompanijama da ostvare svoj puni potencijal u digitalnom svijetu. Sa kombinacijom kreativnosti, tehnološke ekspertize i duboke analize tržišta, kreiramo rješenja koja donose mjerljive rezultate.',
    'about.mission.title': 'Naša misija',
    'about.mission.desc':
      'Pomažemo lokalnim kompanijama da se takmiče na globalnom nivou kroz inovativna digitalna rješenja.',
    'about.vision.title': 'Naša vizija',
    'about.vision.desc': 'Biti vodeća digitalna agencija u regionu poznata po kreativnosti i rezultatima.',
    'about.values.title': 'Naše vrijednosti',
    'about.values.desc': 'Transparentnost, inovacija, rezultati i dugotrajne partnerske veze sa klijentima.',

    // Testimonials
    'testimonials.title': 'Šta kažu naši klijenti',
    'testimonials.subtitle': 'Poverite nam svoj digitalni uspjeh',

    // Contact
    'contact.title': 'Kontaktirajte nas',
    'contact.subtitle': 'Spremni smo da razgovaramo o vašem projektu',
    'contact.name': 'Ime',
    'contact.email': 'Email',
    'contact.message': 'Poruka',
    'contact.send': 'Pošaljite poruku',

    // Footer
    'footer.description': 'Vaš partner za digitalni uspjeh u Crnoj Gori',
    'footer.services': 'Usluge',
    'footer.company': 'Kompanija',
    'footer.contact': 'Kontakt',
    'footer.rights': 'Sva prava zadržana.',
    // General
    'general.back_home': 'Nazad na početnu',
    'general.back': 'Nazad',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.badge': '🚀 #1 Digital agency in Montenegro',
    'hero.title': 'Digital marketing that works',
    'hero.subtitle':
      'We transform your business with modern websites, SEO optimization and digital marketing strategies that deliver results.',
    'hero.cta': 'Get started today',
    'hero.secondary': 'View our work',
    'hero.stats.clients': 'Happy clients',
    'hero.stats.projects': 'Successful projects',
    'hero.stats.rating': 'Average rating',
    'hero.stats.response': 'Response time',
    'hero.image_alt': 'Digital marketing dashboard',

    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'We provide complete digital solutions for your success',
    'services.web.title': 'Web Design & Development',
    'services.web.desc': 'Modern, responsive websites optimized for conversion',
    'services.seo.title': 'SEO & Google Business',
    'services.seo.desc': 'Improve visibility and win more clients through search',
    'services.social.title': 'Social Media Management',
    'services.social.desc': 'Strategies that build brands and increase engagement',
    'services.branding.title': 'Branding & Graphic Design',
    'services.branding.desc': 'Creative solutions that make your brand stand out',
    'services.strategy.title': 'Strategy & Consulting',
    'services.strategy.desc': 'Digital strategies focused on results',

    'services.heading.part1': 'Digital services for',
    'services.heading.emphasis': 'your success',
    'services.description':
      'From web development to full marketing strategies - we help your business reach its maximum potential online.',
    'services.learn_more': 'Learn more',
    'services.why.title.pre': 'Why choose',
    'services.why.title.post': '?',
    'services.why.desc':
      'We combine creativity with technology to craft solutions that not only look great but also deliver measurable results for your business.',
    'services.why.cta': 'Start a project',
    'services.why.fast.title': 'Fast implementation',
    'services.why.fast.desc': 'Projects delivered on time',
    'services.why.results.title': 'Measurable results',
    'services.why.results.desc': 'ROI you can see',
    'services.why.support.title': 'Dedicated support',
    'services.why.support.desc': '24/7 technical assistance',
    'services.why.experience.title': 'Proven experience',
    'services.why.experience.desc': '100+ successful projects',
    'services.web.feature1': 'Responsive design',
    'services.web.feature2': 'SEO optimized',
    'services.web.feature3': 'CMS integration',
    'services.web.feature4': 'E-commerce',
    'services.seo.feature1': 'Keyword research',
    'services.seo.feature2': 'On-page SEO',
    'services.seo.feature3': 'Local SEO',
    'services.seo.feature4': 'Analytics',
    'services.social.feature1': 'Content creation',
    'services.social.feature2': 'Community management',
    'services.social.feature3': 'Paid advertising',
    'services.social.feature4': 'Analytics',
    'services.branding.feature1': 'Logo design',
    'services.branding.feature2': 'Brand guidelines',
    'services.branding.feature3': 'Print materials',
    'services.branding.feature4': 'Digital assets',
    'services.strategy.feature1': 'Market analysis',
    'services.strategy.feature2': 'Competitor research',
    'services.strategy.feature3': 'ROI optimization',
    'services.strategy.feature4': 'Growth strategy',

    // Portfolio
    'portfolio.title': 'Our Work',
    'portfolio.subtitle': 'See projects that transformed our clients',
    'portfolio.all': 'All categories',
    'portfolio.web': 'Websites',
    'portfolio.seo': 'SEO Projects',
    'portfolio.social': 'Social Media',
    'portfolio.branding': 'Branding',

    // About
    'about.title': 'About Us',
    'about.subtitle': 'Your partner for digital success in Montenegro',
    'about.description':
      'BDigital is a modern digital agency from Montenegro that helps companies achieve their full potential in the digital world. With a combination of creativity, technological expertise and deep market analysis, we create solutions that bring measurable results.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc':
      'We help local companies compete globally through innovative digital solutions.',
    'about.vision.title': 'Our Vision',
    'about.vision.desc': 'To be the leading digital agency in the region known for creativity and results.',
    'about.values.title': 'Our Values',
    'about.values.desc': 'Transparency, innovation, results and long-term partnerships with clients.',

    // Testimonials
    'testimonials.title': 'What our clients say',
    'testimonials.subtitle': 'Trust us with your digital success',

    // Contact
    'contact.title': 'Contact us',
    'contact.subtitle': "We're ready to discuss your project",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send message',

    // Footer
    'footer.description': 'Your partner for digital success in Montenegro',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    // General
    'general.back_home': 'Back to home',
    'general.back': 'Back',
  },
} as const;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('me');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
