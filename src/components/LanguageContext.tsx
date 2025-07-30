import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'sr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  sr: {
    // Navigation
    'nav.home': 'Početna',
    'nav.services': 'Usluge',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'O nama',
    'nav.contact': 'Kontakt',
    
    // Hero Section
    'hero.title': 'Digitalno transformišemo vaš biznis',
    'hero.subtitle': 'Kreiramo moderne web stranice, optimizujemo SEO i upravljamo vašim digitalnim prisustvom u Crnoj Gori',
    'hero.cta': 'Započnite transformaciju',
    'hero.secondary': 'Pogledajte naš rad',
    
    // Services
    'services.title': 'Naše usluge',
    'services.subtitle': 'Pružamo kompletna digitalna rešenja za vaš uspeh',
    'services.web.title': 'Web dizajn i razvoj',
    'services.web.desc': 'Moderne, responzivne web stranice optimizovane za konverziju',
    'services.seo.title': 'SEO i Google Business',
    'services.seo.desc': 'Poboljšajte vidljivost i osvojite više klijenata preko pretrage',
    'services.social.title': 'Upravljanje društvenim mrežama',
    'services.social.desc': 'Strategije koje grade brendove i povećavaju angažovanje',
    'services.branding.title': 'Brendiranje i grafički dizajn',
    'services.branding.desc': 'Kreativna rešenja koja izdvajaju vaš brend',
    'services.strategy.title': 'Strategija i konsalting',
    'services.strategy.desc': 'Digitalne strategije usmerene na rezultate',
    
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
    'about.subtitle': 'Vaš partner za digitalni uspeh u Crnoj Gori',
    'about.description': 'BDigital je moderna digitalna agencija iz Crne Gore koja pomaže kompanijama da ostvare svoj puni potencijal u digitalnom svetu. Sa kombinacijom kreativnosti, tehnološke ekspertize i duboke analize tržišta, kreiramo rešenja koja donose merljive rezultate.',
    'about.mission.title': 'Naša misija',
    'about.mission.desc': 'Pomaćemo lokalnim kompanijama da konkurišu na globalnom nivou kroz inovativna digitalna rešenja.',
    'about.vision.title': 'Naša vizija',
    'about.vision.desc': 'Biti vodeća digitalna agencija u regionu poznata po kreativnosti i rezultatima.',
    'about.values.title': 'Naše vrednosti',
    'about.values.desc': 'Transparentnost, inovacija, rezultati i dugotrajne partnerske veze sa klijentima.',
    
    // Testimonials
    'testimonials.title': 'Šta kažu naši klijenti',
    'testimonials.subtitle': 'Poverite nam svoj digitalni uspeh',
    
    // Contact
    'contact.title': 'Kontaktirajte nas',
    'contact.subtitle': 'Spremni smo da razgovaramo o vašem projektu',
    'contact.name': 'Ime',
    'contact.email': 'Email',
    'contact.message': 'Poruka',
    'contact.send': 'Pošaljite poruku',
    
    // Footer
    'footer.description': 'Vaš partner za digitalni uspeh u Crnoj Gori',
    'footer.services': 'Usluge',
    'footer.company': 'Kompanija',
    'footer.contact': 'Kontakt',
    'footer.rights': 'Sva prava zadržana.'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'We digitally transform your business',
    'hero.subtitle': 'We create modern websites, optimize SEO and manage your digital presence in Montenegro',
    'hero.cta': 'Start transformation',
    'hero.secondary': 'View our work',
    
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
    'about.description': 'BDigital is a modern digital agency from Montenegro that helps companies achieve their full potential in the digital world. With a combination of creativity, technological expertise and deep market analysis, we create solutions that bring measurable results.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'We help local companies compete globally through innovative digital solutions.',
    'about.vision.title': 'Our Vision',
    'about.vision.desc': 'To be the leading digital agency in the region known for creativity and results.',
    'about.values.title': 'Our Values',
    'about.values.desc': 'Transparency, innovation, results and long-term partnerships with clients.',
    
    // Testimonials
    'testimonials.title': 'What our clients say',
    'testimonials.subtitle': 'Trust us with your digital success',
    
    // Contact
    'contact.title': 'Contact us',
    'contact.subtitle': 'We\'re ready to discuss your project',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    
    // Footer
    'footer.description': 'Your partner for digital success in Montenegro',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('sr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['sr']] || key;
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