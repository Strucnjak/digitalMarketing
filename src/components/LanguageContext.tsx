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


    // Service Pages - Web Design
    'web.badge': 'Web Design & Development',
    'web.hero.part1': 'Kreiramo',
    'web.hero.emphasis': 'moderne web stranice',
    'web.hero.part2': 'koje prodaju',
    'web.hero.desc':
      'Od ideje do realizacije - razvijamo web stranice koje kombinuju izuzetan dizajn sa funkcionalnosti koja donosi rezultate.',
    'web.hero.cta': 'Započni projekat',
    'web.features.heading': 'Što dobijate sa našim web stranicama',
    'web.features.desc':
      'Svaka web stranica koju kreiramo uključuje sve što vam je potrebno za uspeh online',
    'web.feature.responsive': 'Responzivni dizajn',
    'web.feature.speed': 'Optimizacija brzine',
    'web.feature.seo': 'SEO optimizovano',
    'web.feature.ecommerce': 'E-commerce rešenja',
    'web.feature.design': 'Jedinstveni dizajn',
    'web.feature.clean_code': 'Čist kod',
    'web.process.heading': 'Naš proces rada',
    'web.process.desc':
      'Transparentan i strukturisan pristup koji garantuje uspeh vašeg projekta',
    'web.pricing.heading': 'Paketi i cene',
    'web.pricing.desc':
      'Odaberite paket koji najbolje odgovara vašim potrebama i budžetu',
    'web.package.starter.name': 'Starter',
    'web.package.starter.desc': 'Idealno za manje kompanije',
    'web.package.professional.name': 'Professional',
    'web.package.professional.desc': 'Najpopularniji paket',
    'web.package.enterprise.name': 'Enterprise',
    'web.package.enterprise.desc': 'Za velike kompanije',
    'web.portfolio.heading': 'Naši radovi',
    'web.portfolio.desc':
      'Pogledajte neke od web stranica koje smo kreirali za naše klijente',
    'web.portfolio.view_more': 'Pogledaj više',
    'web.cta.title': 'Spremni za vašu novu web stranicu?',
    'web.cta.desc':
      'Kontaktirajte nas danas za besplatnu konsultaciju i saznajte kako možemo transformisati vaše online prisustvo.',
    'web.cta.primary': 'Besplatna konsultacija',
    'web.cta.secondary': 'Pozovite nas',

    // Service Pages - SEO
    'seo.badge': 'SEO & Google Business',
    'seo.hero.part1': 'Budite',
    'seo.hero.emphasis': '#1 na Google',
    'seo.hero.part2': 'pretragama',
    'seo.hero.desc':
      'Povećajte vidljivost vašeg biznisa u pretraživačima i osvojite više klijenata putem organskih rezultata pretrage.',
    'seo.hero.cta': 'Besplatan SEO audit',
    'seo.services.heading': 'Kompletna SEO usluga',
    'seo.services.desc':
      'Sveobuhvatan pristup SEO optimizaciji koji pokriva sve aspekte digitalnog marketinga',
    'seo.feature.mobile': 'Mobile SEO',
    'seo.feature.technical': 'Technical SEO',
    'seo.results.heading': 'Rezultati koji govore',
    'seo.results.desc':
      'Ovi brojevi pokazuju zašto kompanije u Crnoj Gori biraju BDigital za svoj SEO',
    'seo.pricing.heading': 'SEO paketi',
    'seo.pricing.desc':
      'Odaberite SEO paket koji odgovara veličini vašeg biznisa i ambicijama',
    'seo.package.starter.name': 'Starter SEO',
    'seo.package.starter.desc': 'Za manje kompanije',
    'seo.package.professional.name': 'Professional SEO',
    'seo.package.professional.desc': 'Najpopularniji paket',
    'seo.package.enterprise.name': 'Enterprise SEO',
    'seo.package.enterprise.desc': 'Za velike kompanije',
    'seo.case.heading': 'Studije slučaja',
    'seo.case.desc': 'Kako smo pomogli našim klijentima da dominiraju Google pretragama',
    'seo.cta.title': 'Besplatan SEO audit vašeg sajta',
    'seo.cta.desc':
      'Saznajte šta možete poboljšati na vašoj web stranici da biste se bolje rangirali na Google pretragama.',
    'seo.cta.primary': 'Zatražite besplatan audit',
    'seo.cta.secondary': 'Pozovite nas',

    // Service Pages - Social Media
    'social.badge': 'Social Media Management',
    'social.hero.title': 'Osvajajte društvene mreže',
    'social.hero.desc':
      'Gradimo zajednicu i povećavamo angažman kroz kreativne strategije.',
    'social.hero.cta': 'Počnite danas',
    'social.services.heading': 'Naše social media usluge',
    'social.feature.instagram': 'Instagram Management',
    'social.feature.facebook': 'Facebook Marketing',
    'social.pricing.heading': 'Social Media paketi',
    'social.package.starter.name': 'Starter Social',
    'social.package.professional.name': 'Professional Social',
    'social.package.enterprise.name': 'Enterprise Social',
    'social.cta.title': 'Spremni za jače prisustvo na društvenim mrežama?',
    'social.cta.desc':
      'Kontaktirajte nas i saznajte kako možemo povećati vaše pratioce i angažman.',
    'social.cta.primary': 'Početak saradnje',

    // Service Pages - Branding
    'branding.badge': 'Branding & Graphic Design',
    'branding.hero.title': 'Izgradite prepoznatljiv brend',
    'branding.hero.desc': 'Kreiramo vizuelni identitet koji ostavlja jak utisak.',
    'branding.hero.cta': 'Početak projekta',
    'branding.services.heading': 'Branding usluge',
    'branding.feature.identity': 'Brand identitet',
    'branding.pricing.heading': 'Branding paketi',
    'branding.package.starter.name': 'Starter Branding',
    'branding.package.professional.name': 'Professional Branding',
    'branding.package.enterprise.name': 'Enterprise Branding',
    'branding.cta.title': 'Spremni za novi brand identitet?',
    'branding.cta.desc':
      'Kontaktirajte nas i kreirajmo zajedno brand koji će vas izdvojiti od konkurencije.',
    'branding.cta.primary': 'Konsultacija',

    // Service Pages - Strategy
    'strategy.badge': 'Strategy & Consulting',
    'strategy.hero.emphasis': 'Strategije',
    'strategy.hero.trailing': 'za digitalni uspeh',
    'strategy.hero.desc':
      'Stručne konsultacije i podrška u implementaciji strategije.',
    'strategy.hero.cta': 'Konsultacija',
    'strategy.services.heading': 'Konsalting usluge',
    'strategy.feature.digital': 'Digitalna strategija',
    'strategy.feature.consulting': 'Konsultacije',
    'strategy.pricing.heading': 'Strategy paketi',
    'strategy.package.starter.name': 'Starter Strategy',
    'strategy.package.professional.name': 'Professional Strategy',
    'strategy.package.enterprise.name': 'Enterprise Strategy',
    'strategy.cta.title': 'Spremni za digitalnu transformaciju?',
    'strategy.cta.desc':
      'Zakažite besplatnu konsultaciju i saznajte kako možemo pomoći vašem biznisu.',
    'strategy.cta.primary': 'Zakažite konsultaciju',

    // Portfolio
    'portfolio.title': 'Naš rad',
    'portfolio.subtitle': 'Pogledajte projekte koji su transformisali naše klijente',
    'portfolio.all': 'Sve kategorije',
    'portfolio.web': 'Web stranice',
    'portfolio.seo': 'SEO projekti',
    'portfolio.social': 'Društvene mreže',
    'portfolio.branding': 'Brendiranje',
    'portfolio.badge': 'Portfolio',
    'portfolio.heading.part1': 'Naši',
    'portfolio.heading.emphasis': 'uspešni',
    'portfolio.heading.part2': 'projekti',
    'portfolio.description':
      'Pogledajte kako smo pomogli našim klijentima da ostvare svoje digitalne ambicije i postignu izuzetne rezultate.',
    'portfolio.filter.all': 'Sve',
    'portfolio.filter.web-design': 'Web Design',
    'portfolio.filter.ecommerce': 'E-commerce',
    'portfolio.filter.branding': 'Branding',
    'portfolio.filter.seo': 'SEO',
    'portfolio.cta.title': 'Vaš projekat može biti sledeći',
    'portfolio.cta.desc':
      'Kontaktirajte nas danas i zajedno kreirajmo digitalno rešenje koje će transformisati vaš biznis.',
    'portfolio.cta.primary': 'Započnite svoj projekat',
    'portfolio.view': 'Pogledaj',

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

    'about.stats.title': 'Brojevi govore sami za sebe',
    'about.stats.subtitle':
      'Naši rezultati su dokaz posvećenosti kvalitetu i uspešnosti naših klijenata.',
    'about.stats.clients': 'Zadovoljnih klijenata',
    'about.stats.projects': 'Završenih projekata',
    'about.stats.years': 'Godine iskustva',
    'about.stats.success_rate': 'Stopa uspešnosti',
    'about.team.title': 'Naš tim',
    'about.team.subtitle': 'Upoznajte kreativne umove iza BDigital-a koji stvaraju digitalna rešenja.',
    'about.cta.title': 'Spremni da radimo zajedno?',
    'about.cta.desc':
      'Pridružite se kompanijama koje su odabrale BDigital kao svog partnera za digitalni uspeh.',
    'about.cta.primary': 'Kontaktirajte nas',
    'about.cta.secondary': 'Pogledajte naš rad',

    // Testimonials
    'testimonials.title': 'Šta kažu naši klijenti',
    'testimonials.subtitle': 'Poverite nam svoj digitalni uspjeh',
    'testimonials.stats.clients': 'Zadovoljnih klijenata',
    'testimonials.stats.response': 'Vreme odgovora',
    'testimonials.stats.years': 'Godine iskustva',
    'testimonials.stats.projects': 'Završenih projekata',

    // Contact
    'contact.title': 'Kontaktirajte nas',
    'contact.subtitle': 'Spremni smo da razgovaramo o vašem projektu',
    'contact.name': 'Ime',
    'contact.email': 'Email',
    'contact.message': 'Poruka',
    'contact.send': 'Pošaljite poruku',
    'contact.sending': 'Šalje se...',
    'contact.badge': 'Kontakt',
    'contact.heading.part1': 'Započnimo',
    'contact.heading.emphasis': 'razgovor',
    'contact.description':
      'Spremi ste da transformišete svoj biznis? Kontaktirajte nas danas za besplatnu konsultaciju i saznajte kako možemo pomoći.',
    'contact.form.title': 'Pošaljite nam poruku',
    'contact.success.title': 'Poruka je uspešno poslata!',
    'contact.success.desc': 'Kontaktiraćemo vas u najkraćem mogućem roku.',
    'contact.company': 'Kompanija',
    'contact.phone': 'Telefon',
    'contact.stats.title.pre': 'Zašto klijenti biraju',
    'contact.stats.title.emphasis': 'nas',
    'contact.stats.response': 'Vreme odgovora',
    'contact.stats.clients': 'Zadovoljni klijenti',
    'contact.stats.support': 'Email podrška',
    'contact.stats.years': 'Godina iskustva',
    'contact.meeting.title': 'Zakazivanje sastanka',
    'contact.meeting.desc':
      'Preferirate lični razgovor? Možemo se sresti u našoj kancelariji u Podgorici ili bilo gde što vama odgovara.',
    'contact.meeting.flexible': 'Fleksibilno vreme sastanka',
    'contact.meeting.location': 'Lokacija po vašoj želji',
    'contact.meeting.free': 'Besplatna konsultacija',

    // Footer
    'footer.description': 'Vaš partner za digitalni uspjeh u Crnoj Gori',
    'footer.services': 'Usluge',
    'footer.company': 'Kompanija',
    'footer.contact': 'Kontakt',
    'footer.rights': 'Sva prava zadržana.',
    'footer.terms': 'Uslovi korišćenja',
    'footer.privacy': 'Politika privatnosti',
    'footer.cookies': 'Kolačići',
    'footer.address': 'Podgorica, Crna Gora',
    'footer.phone': '+382 XX XXX XXX',
    'footer.email': 'info@bdigital.me',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.placeholder': 'Vaš email',
    // General
    'general.back_home': 'Nazad na početnu',
    'general.back': 'Nazad',
    // Form
    'form.required_name': 'Ime je obavezno',
    'form.required_email': 'Email je obavezan',
    'form.invalid_email': 'Email nije valjan',
    'form.required_company': 'Kompanija je obavezna',
    'form.required_project_types': 'Odaberite najmanje jedan tip projekta',
    'form.required_field': 'Ovo polje je obavezno',
    'form.required_timeline': 'Odaberite vremenski okvir',
    'form.required_budget': 'Odaberite budžet',
    'form.required_contact': 'Odaberite način kontakta',
    'form.required_business_type': 'Tip biznisa je obavezan',
    'form.required_services': 'Odaberite najmanje jednu uslugu',
    'form.placeholder_full_name': 'Vaše puno ime',
    'form.placeholder_email': 'vasa@email.com',
    'form.placeholder_phone': '+382 67 123 456',
    'form.placeholder_company': 'Naziv vaše kompanije',
    'form.placeholder_website': 'https://www.vasasajt.com',
    'form.placeholder_current_situation':
      'Opišite šta trenutno imate (ili nemate) i zašto tražite naše usluge...',
    'form.placeholder_project_goals':
      'Šta želite da postignete ovim projektom? Povećanje prodaje, više klijenata, bolja online pozicija...',
    'form.placeholder_target_audience':
      'Ko su vaši idealni klijenti? (uzrast, lokacija, interesi...)',
    'form.placeholder_timeline': 'Kada bi voleli da se projekat završi?',
    'form.placeholder_budget': 'Koliki je vaš budžet za ovaj projekat?',
    'form.placeholder_how_hear': 'Odaberite opciju',
    'form.placeholder_current_challenges':
      'Opišite glavne izazove sa kojima se suočavate u digitalnom marketingu...',
    'form.placeholder_goals':
      'Šta želite da postignete? (više klijenata, bolja online pozicija, povećanje prodaje...)',
    'form.placeholder_preferred_time': 'Kada vam odgovara?',
    'form.placeholder_additional_info':
      'Ima li još nešto što bi trebalo da znamo o vašem projektu?',
    'form.placeholder_additional_info_consult':
      'Ima li još nešto što bi trebalo da znamo pre konsultacije?',
    'form.next_step': 'Sledeći korak',
    'form.submit_inquiry': 'Pošalji upit za ponudu',
    'form.submitting': 'Šalje se...',
    'form.submit_consultation': 'Zakaži besplatnu konsultaciju',
    'form.scheduling': 'Zakazuje se konsultacija...',
    'form.new_quote': 'Nova ponuda',
    'form.new_consultation': 'Nova konsultacija',
    'packages.select': 'Odaberi paket',
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

// Service Pages - Web Design
    'web.badge': 'Web Design & Development',
    'web.hero.part1': 'We create',
    'web.hero.emphasis': 'modern websites',
    'web.hero.part2': 'that sell',
    'web.hero.desc':
      'From concept to launch - we craft websites that combine amazing design with functionality that delivers results.',
    'web.hero.cta': 'Start a project',
    'web.features.heading': 'What you get with our websites',
    'web.features.desc':
      'Every website we build includes everything you need for online success',
    'web.feature.responsive': 'Responsive design',
    'web.feature.speed': 'Speed optimization',
    'web.feature.seo': 'SEO optimized',
    'web.feature.ecommerce': 'E-commerce solutions',
    'web.feature.design': 'Unique design',
    'web.feature.clean_code': 'Clean code',
    'web.process.heading': 'Our process',
    'web.process.desc':
      'A transparent and structured approach that ensures your project succeeds',
    'web.pricing.heading': 'Packages & pricing',
    'web.pricing.desc':
      'Choose the package that fits your needs and budget',
    'web.package.starter.name': 'Starter',
    'web.package.starter.desc': 'Ideal for small companies',
    'web.package.professional.name': 'Professional',
    'web.package.professional.desc': 'Most popular package',
    'web.package.enterprise.name': 'Enterprise',
    'web.package.enterprise.desc': 'For large companies',
    'web.portfolio.heading': 'Our work',
    'web.portfolio.desc':
      "Check out some of the sites we've built for clients",
    'web.portfolio.view_more': 'View more',
    'web.cta.title': 'Ready for your new website?',
    'web.cta.desc':
      'Contact us today for a free consultation and see how we can transform your online presence.',
    'web.cta.primary': 'Free consultation',
    'web.cta.secondary': 'Call us',

    // Service Pages - SEO
    'seo.badge': 'SEO & Google Business',
    'seo.hero.part1': 'Be',
    'seo.hero.emphasis': '#1 on Google',
    'seo.hero.part2': 'search results',
    'seo.hero.desc':
      'Increase your visibility in search engines and win more clients through organic search results.',
    'seo.hero.cta': 'Free SEO audit',
    'seo.services.heading': 'Comprehensive SEO service',
    'seo.services.desc':
      'A complete SEO approach covering all aspects of digital marketing',
    'seo.feature.mobile': 'Mobile SEO',
    'seo.feature.technical': 'Technical SEO',
    'seo.results.heading': 'Results that speak',
    'seo.results.desc':
      'These numbers show why companies in Montenegro choose BDigital for SEO',
    'seo.pricing.heading': 'SEO packages',
    'seo.pricing.desc':
      'Choose an SEO package that matches your business size and ambitions',
    'seo.package.starter.name': 'Starter SEO',
    'seo.package.starter.desc': 'For small companies',
    'seo.package.professional.name': 'Professional SEO',
    'seo.package.professional.desc': 'Most popular package',
    'seo.package.enterprise.name': 'Enterprise SEO',
    'seo.package.enterprise.desc': 'For large companies',
    'seo.case.heading': 'Case studies',
    'seo.case.desc': 'How we helped our clients dominate Google searches',
    'seo.cta.title': 'Free SEO audit of your site',
    'seo.cta.desc':
      'Find out what you can improve on your website to rank better on Google.',
    'seo.cta.primary': 'Request free audit',
    'seo.cta.secondary': 'Call us',

    // Service Pages - Social Media
    'social.badge': 'Social Media Management',
    'social.hero.title': 'Dominate social networks',
    'social.hero.desc':
      'We build community and boost engagement through creative strategies.',
    'social.hero.cta': 'Start today',
    'social.services.heading': 'Our social media services',
    'social.feature.instagram': 'Instagram Management',
    'social.feature.facebook': 'Facebook Marketing',
    'social.pricing.heading': 'Social Media packages',
    'social.package.starter.name': 'Starter Social',
    'social.package.professional.name': 'Professional Social',
    'social.package.enterprise.name': 'Enterprise Social',
    'social.cta.title': 'Ready for a stronger social presence?',
    'social.cta.desc':
      'Contact us to learn how we can grow your followers and engagement.',
    'social.cta.primary': 'Start cooperation',

    // Service Pages - Branding
    'branding.badge': 'Branding & Graphic Design',
    'branding.hero.title': 'Build a recognizable brand',
    'branding.hero.desc': 'We create a visual identity that leaves a strong impression.',
    'branding.hero.cta': 'Start project',
    'branding.services.heading': 'Branding services',
    'branding.feature.identity': 'Brand identity',
    'branding.pricing.heading': 'Branding packages',
    'branding.package.starter.name': 'Starter Branding',
    'branding.package.professional.name': 'Professional Branding',
    'branding.package.enterprise.name': 'Enterprise Branding',
    'branding.cta.title': 'Ready for a new brand identity?',
    'branding.cta.desc':
      'Contact us and together we’ll create a brand that sets you apart from the competition.',
    'branding.cta.primary': 'Consultation',

    // Service Pages - Strategy
    'strategy.badge': 'Strategy & Consulting',
    'strategy.hero.emphasis': 'Strategies',
    'strategy.hero.trailing': 'for digital success',
    'strategy.hero.desc':
      'Expert consulting and support in implementing your strategy.',
    'strategy.hero.cta': 'Consultation',
    'strategy.services.heading': 'Consulting services',
    'strategy.feature.digital': 'Digital strategy',
    'strategy.feature.consulting': 'Consultations',
    'strategy.pricing.heading': 'Strategy packages',
    'strategy.package.starter.name': 'Starter Strategy',
    'strategy.package.professional.name': 'Professional Strategy',
    'strategy.package.enterprise.name': 'Enterprise Strategy',
    'strategy.cta.title': 'Ready for digital transformation?',
    'strategy.cta.desc':
      'Schedule a free consultation to see how we can help your business.',
    'strategy.cta.primary': 'Schedule consultation',
    // Portfolio
    'portfolio.title': 'Our Work',
    'portfolio.subtitle': 'See projects that transformed our clients',
    'portfolio.all': 'All categories',
    'portfolio.web': 'Websites',
    'portfolio.seo': 'SEO Projects',
    'portfolio.social': 'Social Media',
    'portfolio.branding': 'Branding',
    'portfolio.badge': 'Portfolio',
    'portfolio.heading.part1': 'Our',
    'portfolio.heading.emphasis': 'successful',
    'portfolio.heading.part2': 'projects',
    'portfolio.description':
      'See how we helped our clients achieve their digital ambitions and outstanding results.',
    'portfolio.filter.all': 'All',
    'portfolio.filter.web-design': 'Web Design',
    'portfolio.filter.ecommerce': 'E-commerce',
    'portfolio.filter.branding': 'Branding',
    'portfolio.filter.seo': 'SEO',
    'portfolio.cta.title': 'Your project could be next',
    'portfolio.cta.desc':
      "Contact us today and together let's create a digital solution that will transform your business.",
    'portfolio.cta.primary': 'Start your project',
    'portfolio.view': 'View',

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

    'about.stats.title': 'Numbers speak for themselves',
    'about.stats.subtitle':
      'Our results show our commitment to quality and success of our clients.',
    'about.stats.clients': 'Happy clients',
    'about.stats.projects': 'Completed projects',
    'about.stats.years': 'Years of experience',
    'about.stats.success_rate': 'Success rate',
    'about.team.title': 'Our Team',
    'about.team.subtitle': 'Meet the creative minds behind BDigital who craft digital solutions.',
    'about.cta.title': 'Ready to work together?',
    'about.cta.desc':
      'Join the companies that chose BDigital as their partner for digital success.',
    'about.cta.primary': 'Contact us',
    'about.cta.secondary': 'View our work',

    // Testimonials
    'testimonials.title': 'What our clients say',
    'testimonials.subtitle': 'Trust us with your digital success',
    'testimonials.stats.clients': 'Satisfied clients',
    'testimonials.stats.response': 'Response time',
    'testimonials.stats.years': 'Years of experience',
    'testimonials.stats.projects': 'Completed projects',

    // Contact
    'contact.title': 'Contact us',
    'contact.subtitle': "We're ready to discuss your project",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    'contact.sending': 'Sending...',
    'contact.badge': 'Contact',
    'contact.heading.part1': "Let's start",
    'contact.heading.emphasis': 'a conversation',
    'contact.description':
      'Ready to transform your business? Contact us today for a free consultation and learn how we can help.',
    'contact.form.title': 'Send us a message',
    'contact.success.title': 'Message sent successfully!',
    'contact.success.desc': 'We will get back to you as soon as possible.',
    'contact.company': 'Company',
    'contact.phone': 'Phone',
    'contact.stats.title.pre': 'Why clients choose',
    'contact.stats.title.emphasis': 'us',
    'contact.stats.response': 'Response time',
    'contact.stats.clients': 'Happy clients',
    'contact.stats.support': 'Email support',
    'contact.stats.years': 'Years of experience',
    'contact.meeting.title': 'Schedule a meeting',
    'contact.meeting.desc':
      'Prefer a face-to-face talk? We can meet at our office in Podgorica or wherever suits you.',
    'contact.meeting.flexible': 'Flexible meeting time',
    'contact.meeting.location': 'Location of your choice',
    'contact.meeting.free': 'Free consultation',

    // Footer
    'footer.description': 'Your partner for digital success in Montenegro',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookies',
    'footer.address': 'Podgorica, Montenegro',
    'footer.phone': '+382 XX XXX XXX',
    'footer.email': 'info@bdigital.me',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.placeholder': 'Your email',
    // General
    'general.back_home': 'Back to home',
    'general.back': 'Back',
    // Form
    'form.required_name': 'Name is required',
    'form.required_email': 'Email is required',
    'form.invalid_email': 'Invalid email',
    'form.required_company': 'Company is required',
    'form.required_project_types': 'Select at least one project type',
    'form.required_field': 'This field is required',
    'form.required_timeline': 'Select a timeline',
    'form.required_budget': 'Select a budget',
    'form.required_contact': 'Select a contact method',
    'form.required_business_type': 'Business type is required',
    'form.required_services': 'Select at least one service',
    'form.placeholder_full_name': 'Your full name',
    'form.placeholder_email': 'you@email.com',
    'form.placeholder_phone': '+1 234 567 890',
    'form.placeholder_company': 'Your company name',
    'form.placeholder_website': 'https://www.yoursite.com',
    'form.placeholder_current_situation':
      'Describe your current situation and why you need our services...',
    'form.placeholder_project_goals':
      'What do you want to achieve with this project? More sales, more clients, better online presence...',
    'form.placeholder_target_audience':
      'Who are your ideal clients? (age, location, interests...)',
    'form.placeholder_timeline': 'When would you like the project completed?',
    'form.placeholder_budget': 'What is your budget for this project?',
    'form.placeholder_how_hear': 'Select an option',
    'form.placeholder_current_challenges':
      'Describe the main challenges you face in digital marketing...',
    'form.placeholder_goals':
      'What do you want to achieve? (more clients, better ranking, increased sales...)',
    'form.placeholder_preferred_time': 'What time works best for you?',
    'form.placeholder_additional_info':
      'Is there anything else we should know about your project?',
    'form.placeholder_additional_info_consult':
      'Is there anything else we should know before the consultation?',
    'form.next_step': 'Next step',
    'form.submit_inquiry': 'Submit inquiry',
    'form.submitting': 'Sending...',
    'form.submit_consultation': 'Schedule free consultation',
    'form.scheduling': 'Scheduling consultation...',
    'form.new_quote': 'New quote',
    'form.new_consultation': 'New consultation',
    'packages.select': 'Choose package',
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
