# DIAL Website Marketing Copy Inventory

## Executive summary

This inventory captures **341 public-facing marketing copy items** from the rendered frontend and SEO configuration, using English as the master and preserving current Montenegrin (ME) and French (FR) wording without correction. It excludes form mechanics, validation/error/success messages, privacy/consent text, accessibility-only strings, technical UI, selectors, and development placeholders.

The master content is split between `src/locales/{en,me,fr}.json` (rendered page copy), hard-coded project titles/stat copy in page components, and `src/config/seo-meta.ts` (SEO plus matching Open Graph/Twitter copy). Route destinations originate in `src/locales/routes.json` and `src/routing.ts`. Several locale keys contain unused legacy marketing copy; this inventory records copy rendered by current marketing components rather than dormant strings.

## Brand positioning

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `hero.tagline` | Homepage | Label / copy | Strategic growth through data-driven marketing | Strategijski rast kroz marketing zasnovan na podacima | Croissance stratégique grâce au marketing piloté par la data | **HERO** — Generic or vague outcome language; Agency jargon / weak differentiation |
| `hero.title` | Homepage | Headline / label | Digital marketing that works | Digitalni marketing koji radi | Marketing digital qui performe | **HERO** — No obvious issue in isolation |
| `hero.subtitle` | Homepage | Headline / label | We transform your business with modern websites, SEO optimization and digital marketing strategies that deliver results. | Transformišemo vaš biznis kroz moderne web stranice, SEO optimizaciju i strategije digitalnog marketinga koje donose rezultate. | Nous transformons votre business avec des sites modernes, du SEO puissant et des stratégies digitales qui génèrent des résultats. | **HERO** — Generic or vague outcome language |
| `services.heading.part1` | Homepage | Headline / label | Digital services for | Digitalne usluge za | Services digitaux pour | **SERVICE** — No obvious issue in isolation |
| `services.heading.emphasis` | Homepage | Headline / label | your success | vaš uspjeh | votre réussite | **SERVICE** — Generic or vague outcome language |
| `services.description` | Homepage | Description | From web development to full marketing strategies - we help your business reach its maximum potential online. | Od web development-a do kompletnih marketing strategija – pomažemo vašem biznisu da ostvari maksimalni potencijal u digitalnom svijetu. | Du développement web aux stratégies marketing complètes — nous aidons votre entreprise à atteindre son plein potentiel en ligne. | **SERVICE** — Generic or vague outcome language; Claim needs evidence or qualification |
| `about.description` | Homepage | Description | DIAL Digital is a modern digital agency from Montenegro that helps companies achieve their full potential in the digital world. With a combination of creativity, technological expertise and deep market analysis, we create solutions that bring measurable results. | DIAL Digital je moderna digitalna agencija iz Crne Gore koja pomaže kompanijama da ostvare svoj puni potencijal u digitalnom svijetu. Sa kombinacijom kreativnosti, tehnološke ekspertize i duboke analize tržišta, kreiramo rješenja koja donose mjerljive rezultate. | DIAL Digital est une agence moderne qui aide les entreprises à atteindre leur plein potentiel dans le monde digital grâce à la créativité, l’expertise technologique et une analyse de marché approfondie. | **ABOUT** — Generic or vague outcome language; Agency jargon / weak differentiation; Long sentence; hierarchy may be difficult to scan |
| `about.approach.title` | Homepage | Headline / label | We connect acquisition, experience and measurement into one growth system. | Povezujemo akviziciju, iskustvo i mjerenje u jedan sistem rasta. | Nous relions acquisition, expérience et mesure au sein d’un même système de croissance. | **METHODOLOGY / PROCESS** — Generic or vague outcome language |
| `about.approach.body` | Homepage | Description | We do not treat web, search, content and brand as separate tasks. Every decision should support a clearer path from attention to conversion and a lasting customer relationship. | Ne tretiramo web, pretragu, sadržaj i brend kao odvojene zadatke. Svaka odluka treba da podrži jasniji put od pažnje do konverzije i dugoročnog odnosa sa klijentom. | Nous ne traitons pas le web, la recherche, le contenu et la marque comme des sujets isolés. Chaque décision doit faciliter le passage de l’attention à la conversion et construire une relation client durable. | **METHODOLOGY / PROCESS** — Long sentence; hierarchy may be difficult to scan |
| `footer.description` | Homepage | Description | Your partner for digital success in Montenegro | Vaš partner za digitalni uspjeh u Crnoj Gori | Votre partenaire digital au Monténégro | **FOOTER** — Generic or vague outcome language |

## Homepage

### Navigation

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `nav.home` | Homepage | Label / copy | Home | Početna | Accueil | **NAVIGATION** — No obvious issue in isolation |
| `nav.services` | Homepage | Label / copy | Services | Usluge | Services | **NAVIGATION** — No obvious issue in isolation |
| `nav.portfolio` | Homepage | Label / copy | Portfolio | Portfolio | Portfolio | **NAVIGATION** — No obvious issue in isolation |
| `nav.about` | Homepage | Label / copy | About | O nama | À propos | **NAVIGATION** — No obvious issue in isolation |
| `nav.contact` | Homepage | Label / copy | Contact | Kontakt | Contact | **NAVIGATION** — No obvious issue in isolation |

### Hero

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `hero.title` | Homepage | Headline / label | Digital marketing that works | Digitalni marketing koji radi | Marketing digital qui performe | **HERO** — No obvious issue in isolation |
| `hero.tagline` | Homepage | Label / copy | Strategic growth through data-driven marketing | Strategijski rast kroz marketing zasnovan na podacima | Croissance stratégique grâce au marketing piloté par la data | **HERO** — Generic or vague outcome language; Agency jargon / weak differentiation |
| `hero.subtitle` | Homepage | Headline / label | We transform your business with modern websites, SEO optimization and digital marketing strategies that deliver results. | Transformišemo vaš biznis kroz moderne web stranice, SEO optimizaciju i strategije digitalnog marketinga koje donose rezultate. | Nous transformons votre business avec des sites modernes, du SEO puissant et des stratégies digitales qui génèrent des résultats. | **HERO** — Generic or vague outcome language |
| `hero.secondary` | Homepage | CTA | View our work | Pogledajte radove | Voir nos réalisations | **CTA** — No obvious issue in isolation |

### Services

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `services.title` | Homepage | Headline / label | Our Services | Naše usluge | Nos services | **SERVICE** — No obvious issue in isolation |
| `services.web.title` | Homepage | Headline / label | Web Design & Development | Web dizajn i razvoj | Création & Développement Web | **SERVICE** — No obvious issue in isolation |
| `services.web.desc` | Homepage | Description | Modern, responsive websites optimized for conversion | Moderne, responzivne web stranice optimizovane za konverziju | Sites modernes et responsives optimisés pour convertir | **SERVICE** — No obvious issue in isolation |
| `services.seo.title` | Homepage | Headline / label | SEO & Google Business | SEO i Google Business | SEO & Google Business | **SERVICE** — No obvious issue in isolation |
| `services.seo.desc` | Homepage | Description | Improve visibility and win more clients through search | Poboljšajte vidljivost i osvojite više klijenata preko pretrage | Boostez votre visibilité et attirez plus de clients | **SERVICE** — No obvious issue in isolation |
| `services.social.title` | Homepage | Headline / label | Social Media Management | Upravljanje društvenim mrežama | Gestion des réseaux sociaux | **SERVICE** — No obvious issue in isolation |
| `services.social.desc` | Homepage | Description | Strategies that build brands and increase engagement | Strategije koje grade brendove i povećavaju angažman | Des stratégies qui construisent des marques et augmentent l'engagement | **SERVICE** — No obvious issue in isolation |
| `services.branding.title` | Homepage | Headline / label | Branding & Graphic Design | Brendiranje i grafički dizajn | Branding & Design graphique | **SERVICE** — No obvious issue in isolation |
| `services.branding.desc` | Homepage | Description | Creative solutions that make your brand stand out | Kreativna rješenja koja izdvajaju vaš brend | Une identité visuelle qui vous démarque instantanément | **SERVICE** — Generic or vague outcome language |
| `services.strategy.title` | Homepage | Headline / label | Strategy & Consulting | Strategija i savjetovanje | Stratégie & Consulting | **SERVICE** — No obvious issue in isolation |
| `services.strategy.desc` | Homepage | Description | Digital strategies focused on results | Digitalne strategije usmjerene na rezultate | Des stratégies digitales orientées résultats | **SERVICE** — Generic or vague outcome language |
| `services.heading.part1` | Homepage | Headline / label | Digital services for | Digitalne usluge za | Services digitaux pour | **SERVICE** — No obvious issue in isolation |
| `services.heading.emphasis` | Homepage | Headline / label | your success | vaš uspjeh | votre réussite | **SERVICE** — Generic or vague outcome language |
| `services.description` | Homepage | Description | From web development to full marketing strategies - we help your business reach its maximum potential online. | Od web development-a do kompletnih marketing strategija – pomažemo vašem biznisu da ostvari maksimalni potencijal u digitalnom svijetu. | Du développement web aux stratégies marketing complètes — nous aidons votre entreprise à atteindre son plein potentiel en ligne. | **SERVICE** — Generic or vague outcome language; Claim needs evidence or qualification |
| `services.social.feature1` | Homepage | Feature / process step | Content creation | Kreiranje sadržaja | Création de contenu | **SERVICE** — No obvious issue in isolation |
| `services.social.feature3` | Homepage | Feature / process step | Paid advertising | Plaćeno oglašavanje | Publicités payantes | **SERVICE** — No obvious issue in isolation |
| `services.branding.feature1` | Homepage | Feature / process step | Logo design | Dizajn logotipa | Logo sur mesure | **SERVICE** — Deliverable-led; outcome is not explicit |
| `services.branding.feature2` | Homepage | Feature / process step | Brand guidelines | Smjernice brenda | Charte graphique | **SERVICE** — No obvious issue in isolation |
| `services.branding.feature3` | Homepage | Feature / process step | Print materials | Štampani materijali | Supports imprimés | **SERVICE** — No obvious issue in isolation |
| `services.strategy.feature2` | Homepage | Feature / process step | Competitor research | Istraživanje konkurencije | Analyse concurrentielle | **SERVICE** — No obvious issue in isolation |
| `services.strategy.feature3` | Homepage | Feature / process step | ROI optimization | Optimizacija ROI-a | Optimisation du ROI | **SERVICE** — No obvious issue in isolation |
| `services.social.feature1_desc` | Homepage | Description | Professional photos, video content and graphic design | Profesionalne fotografije, video sadržaj i grafički dizajn | Photos, vidéos et visuels professionnels | **SERVICE** — Deliverable-led; outcome is not explicit |
| `services.social.feature3_desc` | Homepage | Description | Paid ads across all social networks with targeted audience | Plaćene reklame na svim društvenim mrežama sa ciljanom publikom | Publicités ciblées sur tous les réseaux | **SERVICE** — No obvious issue in isolation |
| `services.group.strategy` | Homepage | Label / copy | Strategic direction | Strateški pravac | Orientation stratégique | **SERVICE** — No obvious issue in isolation |
| `services.group.execution` | Homepage | Label / copy | Primary capabilities | Primarne mogućnosti | Expertises principales | **SERVICE** — No obvious issue in isolation |
| `services.group.supporting` | Homepage | Label / copy | Growth support | Podrška rastu | Soutien à la croissance | **SERVICE** — Generic or vague outcome language |
| `services.strategy.guidance` | Homepage | Description | Start with strategy when the right channels, priorities or path to growth are not yet clear. | Počnite strategijom kada su kanali, prioriteti ili put do rasta još uvijek nejasni. | Commencez par la stratégie lorsque les canaux, les priorités ou la voie de croissance ne sont pas encore clairs. | **SERVICE** — Generic or vague outcome language |
| `services.unsure` | Homepage | Label / copy | Not sure where to begin? | Nijeste sigurni odakle da počnete? | Vous ne savez pas par où commencer ? | **SERVICE** — No obvious issue in isolation |

### Portfolio

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `portfolio.badge` | Homepage | Label / copy | Portfolio | Portfolio | Portfolio | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.heading.part1` | Homepage | Headline / label | Our | Naši | Des projets | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.heading.emphasis` | Homepage | Headline / label | successful | uspješni | qui réussissent | **PORTFOLIO / CASE STUDY** — Generic or vague outcome language |
| `portfolio.heading.part2` | Homepage | Headline / label | projects | projekti |  | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.description` | Homepage | Description | See how we helped our clients achieve their digital ambitions and outstanding results. | Pogledajte kako smo pomogli našim klijentima da ostvare svoje digitalne ambicije i postignu izuzetne rezultate. | Découvrez comment nous aidons nos clients à atteindre l’excellence digitale. | **PORTFOLIO / CASE STUDY** — Generic or vague outcome language |
| `portfolio.case.context` | Homepage | Label / copy | Context | Kontekst | Contexte | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.case.intervention` | Homepage | Label / copy | What we did | Šta smo uradili | Notre intervention | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.projects.properties.category` | Homepage | Label / copy | Web design | Web dizajn | Webdesign | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.projects.properties.context` | Homepage | Label / copy | An elegant website for one of Montenegro’s leading real-estate agencies. | Elegantna web stranica za jednu od vodećih agencija za nekretnine u Crnoj Gori. | Un site élégant pour l’une des principales agences immobilières du Monténégro. | **PORTFOLIO / CASE STUDY** — Claim needs evidence or qualification |
| `portfolio.projects.properties.intervention` | Homepage | Label / copy | A web experience with an advanced property-search system. | Web iskustvo sa naprednim sistemom pretrage nekretnina. | Une expérience web avec un système avancé de recherche de biens. | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.projects.properties.year` | Homepage | Label / copy | 2024 | 2024 | 2024 | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.projects.adriatic.category` | Homepage | Label / copy | E-commerce | E-commerce | E-commerce | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.projects.adriatic.context` | Homepage | Label / copy | An e-commerce experience for a travel agency. | E-commerce iskustvo za turističku agenciju. | Une expérience e-commerce pour une agence de voyages. | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.projects.adriatic.intervention` | Homepage | Label / copy | Online booking and payment-gateway integration. | Online rezervacije i integracija platnog sistema. | Réservation en ligne et intégration d’une passerelle de paiement. | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.projects.adriatic.year` | Homepage | Label / copy | 2024 | 2024 | 2024 | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.projects.techstart.category` | Homepage | Label / copy | Branding | Brendiranje | Branding | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.projects.techstart.context` | Homepage | Label / copy | A rebrand strategy for a technology startup. | Rebrand strategija za tehnološki startup. | Une stratégie de rebranding pour une startup technologique. | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.projects.techstart.intervention` | Homepage | Label / copy | Logo, brand guidelines and marketing materials. | Logotip, smjernice brenda i marketinški materijali. | Logo, charte de marque et supports marketing. | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |
| `portfolio.projects.techstart.year` | Homepage | Label / copy | 2023 | 2023 | 2023 | **PORTFOLIO / CASE STUDY** — No obvious issue in isolation |

### About

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `about.description` | Homepage | Description | DIAL Digital is a modern digital agency from Montenegro that helps companies achieve their full potential in the digital world. With a combination of creativity, technological expertise and deep market analysis, we create solutions that bring measurable results. | DIAL Digital je moderna digitalna agencija iz Crne Gore koja pomaže kompanijama da ostvare svoj puni potencijal u digitalnom svijetu. Sa kombinacijom kreativnosti, tehnološke ekspertize i duboke analize tržišta, kreiramo rješenja koja donose mjerljive rezultate. | DIAL Digital est une agence moderne qui aide les entreprises à atteindre leur plein potentiel dans le monde digital grâce à la créativité, l’expertise technologique et une analyse de marché approfondie. | **ABOUT** — Generic or vague outcome language; Agency jargon / weak differentiation; Long sentence; hierarchy may be difficult to scan |
| `about.team.title` | Homepage | Headline / label | Our Team | Naš tim | Notre équipe | **ABOUT** — No obvious issue in isolation |
| `about.team.subtitle` | Homepage | Headline / label | Meet the creative minds behind DIAL Digital who craft digital solutions. | Upoznajte kreativne umove iza DIAL Digital-a koji stvaraju digitalna rješenja. | Rencontrez les experts derrière nos solutions digitales. | **ABOUT** — Agency jargon / weak differentiation |
| `about.approach.eyebrow` | Homepage | Label / copy | How we work | Kako radimo | Notre méthode | **METHODOLOGY / PROCESS** — No obvious issue in isolation |
| `about.approach.title` | Homepage | Headline / label | We connect acquisition, experience and measurement into one growth system. | Povezujemo akviziciju, iskustvo i mjerenje u jedan sistem rasta. | Nous relions acquisition, expérience et mesure au sein d’un même système de croissance. | **METHODOLOGY / PROCESS** — Generic or vague outcome language |
| `about.approach.body` | Homepage | Description | We do not treat web, search, content and brand as separate tasks. Every decision should support a clearer path from attention to conversion and a lasting customer relationship. | Ne tretiramo web, pretragu, sadržaj i brend kao odvojene zadatke. Svaka odluka treba da podrži jasniji put od pažnje do konverzije i dugoročnog odnosa sa klijentom. | Nous ne traitons pas le web, la recherche, le contenu et la marque comme des sujets isolés. Chaque décision doit faciliter le passage de l’attention à la conversion et construire une relation client durable. | **METHODOLOGY / PROCESS** — Long sentence; hierarchy may be difficult to scan |
| `about.approach.items.1` | Homepage | Feature / process step | First, we understand the market, audience and commercial objective. | Prvo razumijemo tržište, publiku i komercijalni cilj. | Nous commençons par comprendre le marché, l’audience et l’objectif commercial. | **METHODOLOGY / PROCESS** — No obvious issue in isolation |
| `about.approach.items.2` | Homepage | Feature / process step | Then we shape the experience and message around the decisions a customer needs to make. | Zatim oblikujemo iskustvo i poruke oko odluka koje korisnik treba da donese. | Nous façonnons ensuite l’expérience et le message autour des décisions du client. | **METHODOLOGY / PROCESS** — No obvious issue in isolation |
| `about.approach.items.3` | Homepage | Feature / process step | Finally, we measure, learn and direct the next priority. | Na kraju mjerimo, učimo i usmjeravamo naredni prioritet. | Enfin, nous mesurons, apprenons et définissons la priorité suivante. | **METHODOLOGY / PROCESS** — No obvious issue in isolation |

### Testimonials

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `testimonials.title` | Homepage | Headline / label | What our clients say | Šta kažu naši klijenti | Témoignages clients | **PROOF / TESTIMONIAL** — No obvious issue in isolation |

### Contact

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `contact.send` | Homepage | Label / copy | Send message | Pošaljite poruku | Envoyer le message | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `contact.badge` | Homepage | Label / copy | Contact | Kontakt | Contact | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `contact.heading.part1` | Homepage | Headline / label | Let's start | Započnimo | Engageons | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `contact.heading.emphasis` | Homepage | Headline / label | a conversation | razgovor | la conversation | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `contact.description` | Homepage | Description | Ready to transform your business? Contact us today for a free consultation and learn how we can help. | Spremni ste da transformišete svoj biznis? Kontaktirajte nas danas za besplatnu konsultaciju i saznajte kako možemo pomoći. | Prêt à transformer votre business ? Contactez-nous pour une consultation gratuite. | **CONTACT MARKETING COPY** — Generic or vague outcome language |
| `contact.info.email` | Homepage | Label / copy | Email | Email | Email | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `contact.info.phone` | Homepage | Label / copy | Phone | Telefon | Téléphone | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `contact.info.location` | Homepage | Label / copy | Location | Lokacija | Localisation | **CONTACT MARKETING COPY** — No obvious issue in isolation |

### Footer

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `footer.description` | Homepage | Description | Your partner for digital success in Montenegro | Vaš partner za digitalni uspjeh u Crnoj Gori | Votre partenaire digital au Monténégro | **FOOTER** — Generic or vague outcome language |
| `footer.services` | Homepage | Label / copy | Services | Usluge | Services | **FOOTER** — No obvious issue in isolation |
| `footer.contact` | Homepage | Label / copy | Contact | Kontakt | Contact | **FOOTER** — No obvious issue in isolation |
| `footer.rights` | Homepage | Label / copy | All rights reserved. | Sva prava zadržana. | Tous droits réservés. | **FOOTER** — No obvious issue in isolation |
| `footer.location` | Homepage | Label / copy | Podgorica · Montenegro | Podgorica · Crna Gora | Podgorica · Monténégro | **FOOTER** — No obvious issue in isolation |

## Service pages

### Web Design & Development

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `web.badge` | Web Design | Label / copy | Web Design & Development | Web dizajn i razvoj | Création & Développement Web | **SERVICE** — No obvious issue in isolation |
| `web.hero.part1` | Web Design | Headline / label | Websites | Web sajtovi | Des sites web | **SERVICE** — No obvious issue in isolation |
| `web.hero.emphasis` | Web Design | Headline / label | that look great and deliver | koji izgledaju odlično | qui séduisent et qui convertissent | **SERVICE** — No obvious issue in isolation |
| `web.hero.part2` | Web Design | Headline / label | results |  i donose rezultate |  | **SERVICE** — Generic or vague outcome language |
| `web.hero.desc` | Web Design | Description | From concept to launch - we craft websites that combine amazing design with functionality that delivers results. | Od ideje do realizacije – razvijamo web stranice koje kombinuju izuzetan dizajn sa funkcionalnošću koja donosi rezultate. | De l’idée au lancement — nous créons des sites qui allient design remarquable et performance pour générer des résultats. | **SERVICE** — Generic or vague outcome language; Agency jargon / weak differentiation |
| `web.hero.cta` | Web Design | CTA | Start a project | Započni projekat | Démarrer un projet | **CTA** — CTA wording is inconsistent across pages |
| `web.features.heading` | Web Design | Headline / label | What you get with our websites | Što dobijate sa našim web stranicama | Ce que vous obtenez avec nos sites | **SERVICE** — No obvious issue in isolation |
| `web.features.desc` | Web Design | Description | Every website we build includes everything you need for online success | Svaka web stranica koju kreiramo uključuje sve što vam je potrebno za uspjeh online | Chaque site inclut tout ce dont vous avez besoin pour réussir en ligne | **SERVICE** — Generic or vague outcome language; Deliverable-led; outcome is not explicit |
| `web.feature.responsive` | Web Design | Feature / process step | Responsive design | Responzivni dizajn | Design responsive | **SERVICE** — Deliverable-led; outcome is not explicit |
| `web.feature.speed` | Web Design | Feature / process step | Speed optimization | Optimizacija brzine | Optimisation de vitesse | **SERVICE** — No obvious issue in isolation |
| `web.feature.seo` | Web Design | Feature / process step | SEO optimized | SEO optimizovano | Optimisé SEO | **SERVICE** — No obvious issue in isolation |
| `web.feature.ecommerce` | Web Design | Feature / process step | E-commerce solutions | E-commerce rješenja | Solution e-commerce | **SERVICE** — No obvious issue in isolation |
| `web.feature.design` | Web Design | Feature / process step | Unique design | Jedinstveni dizajn | Design unique | **SERVICE** — Deliverable-led; outcome is not explicit |
| `web.feature.clean_code` | Web Design | Feature / process step | Clean code | Čist kod | Code propre et moderne | **SERVICE** — No obvious issue in isolation |
| `web.process.heading` | Web Design | Headline / label | Our process | Naš proces rada | Notre processus | **SERVICE** — No obvious issue in isolation |
| `web.process.desc` | Web Design | Description | A transparent and structured approach that ensures your project succeeds | Transparentan i strukturisan pristup koji garantuje uspjeh vašeg projekta | Une approche structurée et transparente pour garantir votre succès | **SERVICE** — No obvious issue in isolation |
| `web.pricing.heading` | Web Design | Headline / label | Packages & pricing | Paketi i cijene | Offres & tarifs | **SERVICE** — No obvious issue in isolation |
| `web.pricing.desc` | Web Design | Description | Choose the package that fits your needs and budget | Odaberite paket koji najbolje odgovara vašim potrebama i budžetu | Choisissez l’offre adaptée à vos besoins et à votre budget | **SERVICE** — No obvious issue in isolation |
| `web.package.starter.name` | Web Design | Package / deliverable | Starter | Starter | Starter | **SERVICE** — No obvious issue in isolation |
| `web.package.starter.desc` | Web Design | Description | Ideal for small companies | Idealno za manje kompanije | Idéal pour les petites entreprises | **SERVICE** — No obvious issue in isolation |
| `web.package.professional.name` | Web Design | Package / deliverable | Professional | Professional | Professionnel | **SERVICE** — No obvious issue in isolation |
| `web.package.professional.desc` | Web Design | Description | Most popular package | Najpopularniji paket | Notre offre la plus populaire | **SERVICE** — No obvious issue in isolation |
| `web.package.enterprise.name` | Web Design | Package / deliverable | Enterprise | Enterprise | Entreprise | **SERVICE** — No obvious issue in isolation |
| `web.package.enterprise.desc` | Web Design | Description | For large companies | Za velike kompanije | Pour les grandes entreprises | **SERVICE** — No obvious issue in isolation |
| `web.pricing.note` | Web Design | Label / copy | Note: All packages are flexible and can be tailored to your project — pricing may be lower or higher depending on scope and complexity. | Napomena: Svi paketi su fleksibilni i mogu biti prilagođeni specifičnostima vašeg projekta — cijena može biti niža ili viša u zavisnosti od obima i kompleksnosti. | Remarque : toutes nos offres sont personnalisables — le tarif final varie selon la complexité du projet. | **SERVICE** — Agency jargon / weak differentiation |
| `web.portfolio.heading` | Web Design | Headline / label | Our work | Naši radovi | Nos réalisations | **SERVICE** — No obvious issue in isolation |
| `web.portfolio.desc` | Web Design | Description | Check out some of the sites we've built for clients | Pogledajte neke od web stranica koje smo kreirali za naše klijente | Découvrez quelques sites créés pour nos clients | **SERVICE** — No obvious issue in isolation |
| `web.cta.title` | Web Design | Headline / label | Ready for your new website? | Spremni za vašu novu web stranicu? | Prêt pour un nouveau site web ? | **CTA** — No obvious issue in isolation |
| `web.cta.desc` | Web Design | Description | Contact us today for a free consultation and see how we can transform your online presence. | Kontaktirajte nas danas za besplatnu konsultaciju i saznajte kako možemo transformisati vaše online prisustvo. | Contactez-nous aujourd’hui pour une consultation gratuite et découvrez comment améliorer votre présence en ligne. | **CTA** — Generic or vague outcome language; CTA wording is inconsistent across pages |
| `web.cta.primary` | Web Design | CTA | Free consultation | Besplatna konsultacija | Consultation gratuite | **CTA** — No obvious issue in isolation |
| `web.cta.secondary` | Web Design | CTA | Call us | Pozovite nas | Nous appeler | **CTA** — No obvious issue in isolation |
| `web.feature.responsive_desc` | Web Design | Description | Websites that work flawlessly on all devices - desktop, tablet and mobile | Web stranice koje savršeno rade na svim uređajima – desktop, tablet i mobilni | Un site impeccable sur ordinateur, tablette et mobile | **SERVICE** — No obvious issue in isolation |
| `web.feature.speed_desc` | Web Design | Description | We optimize every page for maximum loading speed | Optimizujemo svaku stranicu za maksimalnu brzinu učitavanja | Optimisation maximale de la vitesse de chargement | **SERVICE** — Claim needs evidence or qualification |
| `web.feature.seo_desc` | Web Design | Description | Built for search engines from day one | Izgrađeno za pretraživače od prvog dana | Pensé pour le SEO dès le premier jour | **SERVICE** — No obvious issue in isolation |
| `web.feature.ecommerce_desc` | Web Design | Description | Complete online shop with payment gateway integration | Kompletan online shop sa payment gateway integracijom | Boutique en ligne avec paiement sécurisé | **SERVICE** — No obvious issue in isolation |
| `web.feature.design_desc` | Web Design | Description | Creative designs that reflect your brand identity | Kreativni dizajni koji odražavaju identitet vašeg brenda | Design créatif qui reflète votre identité | **SERVICE** — Deliverable-led; outcome is not explicit |
| `web.feature.clean_code_desc` | Web Design | Description | Modern, maintainable code following best practices | Moderan, održivi kod koji prati najbolje prakse | Code propre et évolutif selon les standards modernes | **SERVICE** — No obvious issue in isolation |
| `web.process.step1.title` | Web Design | Headline / label | Planning and analysis | Planiranje i analiza | Planification & analyse | **SERVICE** — No obvious issue in isolation |
| `web.process.step1.desc` | Web Design | Description | We analyze your needs, goals and competitors | Analiziramo vaše potrebe, ciljeve i konkurenciju | Étude de vos besoins, objectifs & concurrents | **SERVICE** — No obvious issue in isolation |
| `web.process.step1.duration` | Web Design | Label / copy | 1-2 weeks | 1–2 nedjelje | 1–2 semaines | **SERVICE** — No obvious issue in isolation |
| `web.process.step2.title` | Web Design | Headline / label | Design and prototype | Dizajn i prototip | Design & prototype | **SERVICE** — No obvious issue in isolation |
| `web.process.step2.desc` | Web Design | Description | We create wireframes and high-fidelity design | Kreiramo wireframes i visoko-fidelni dizajn | Création de maquettes haute fidélité | **SERVICE** — No obvious issue in isolation |
| `web.process.step2.duration` | Web Design | Label / copy | 2-3 weeks | 2–3 nedjelje | 2–3 semaines | **SERVICE** — No obvious issue in isolation |
| `web.process.step3.title` | Web Design | Headline / label | Development | Development | Développement | **SERVICE** — No obvious issue in isolation |
| `web.process.step3.desc` | Web Design | Description | We code the website using the latest technologies | Kodiramo web stranicu koristeći najnovije tehnologije | Développement avec les dernières technologies | **SERVICE** — No obvious issue in isolation |
| `web.process.step3.duration` | Web Design | Label / copy | 3-4 weeks | 3–4 nedjelje | 3–4 semaines | **SERVICE** — No obvious issue in isolation |
| `web.process.step4.title` | Web Design | Headline / label | Testing and launch | Testiranje i lansiranje | Tests & mise en ligne | **SERVICE** — No obvious issue in isolation |
| `web.process.step4.desc` | Web Design | Description | We test all features and launch the site | Testiramo sve funkcionalnosti i lansiramo sajt | Vérification complète avant lancement | **SERVICE** — No obvious issue in isolation |
| `web.process.step4.duration` | Web Design | Label / copy | 1 week | 1 nedjelja | 1 semaine | **SERVICE** — No obvious issue in isolation |
| `web.stat.sites` | Web Design | Label / copy | Websites | Web sajtova | Sites web | **SERVICE** — No obvious issue in isolation |
| `web.stat.support` | Web Design | Label / copy | Support | Podrška | Support | **SERVICE** — No obvious issue in isolation |
| `web.package.starter.feature1` | Web Design | Feature / process step | Up to 5 pages | Do 5 stranica | Jusqu’à 5 pages | **SERVICE** — Deliverable-led; outcome is not explicit |
| `web.package.starter.feature2` | Web Design | Feature / process step | Responsive design | Responzivni dizajn | Design responsive | **SERVICE** — Deliverable-led; outcome is not explicit |
| `web.package.starter.feature3` | Web Design | Feature / process step | Contact form | Kontakt forma | Formulaire de contact | **SERVICE** — No obvious issue in isolation |
| `web.package.starter.feature4` | Web Design | Feature / process step | Basic SEO | Osnovni SEO | SEO basique | **SERVICE** — No obvious issue in isolation |
| `web.package.starter.feature5` | Web Design | Feature / process step | 3 months support | 3 mjeseca podrška | 3 mois de support | **SERVICE** — Deliverable-led; outcome is not explicit |
| `web.package.professional.feature1` | Web Design | Feature / process step | Up to 15 pages | Do 15 stranica | Jusqu’à 15 pages | **SERVICE** — Deliverable-led; outcome is not explicit |
| `web.package.professional.feature2` | Web Design | Feature / process step | Custom design | Custom dizajn | Design personnalisé | **SERVICE** — Deliverable-led; outcome is not explicit |
| `web.package.professional.feature3` | Web Design | Feature / process step | CMS system | CMS sistem | CMS intégré | **SERVICE** — No obvious issue in isolation |
| `web.package.professional.feature4` | Web Design | Feature / process step | Advanced SEO | Napredni SEO | SEO avancé | **SERVICE** — No obvious issue in isolation |
| `web.package.professional.feature5` | Web Design | Feature / process step | Google Analytics | Google Analytics | Google Analytics | **SERVICE** — No obvious issue in isolation |
| `web.package.professional.feature6` | Web Design | Feature / process step | 6 months support | 6 mjeseci podrška | 6 mois de support | **SERVICE** — Deliverable-led; outcome is not explicit |
| `web.package.enterprise.feature1` | Web Design | Feature / process step | Unlimited pages | Neograničen broj stranica | Pages illimitées | **SERVICE** — Claim needs evidence or qualification; Deliverable-led; outcome is not explicit |
| `web.package.enterprise.feature2` | Web Design | Feature / process step | E-commerce functionality | E-commerce funkcionalnost | E-commerce complet | **SERVICE** — No obvious issue in isolation |
| `web.package.enterprise.feature3` | Web Design | Feature / process step | API integrations | API integracije | Intégrations API | **SERVICE** — No obvious issue in isolation |
| `web.package.enterprise.feature4` | Web Design | Feature / process step | Multilingual site | Multilingvalni sajt | Site multilingue | **SERVICE** — No obvious issue in isolation |
| `web.package.enterprise.feature5` | Web Design | Feature / process step | Premium support | Premium podrška | Support premium | **SERVICE** — Deliverable-led; outcome is not explicit |
| `web.package.enterprise.feature6` | Web Design | Feature / process step | 12 months support | 12 mjeseci podrška | 12 mois de support | **SERVICE** — Deliverable-led; outcome is not explicit |
| `web.portfolio.project1.desc` | Web Design | Description | Modern website for a traditional restaurant with online reservations | Moderna web stranica za tradicionalni restoran sa online rezervacijama | Site moderne pour restaurant avec réservation en ligne | **SERVICE** — No obvious issue in isolation |
| `web.portfolio.project2.desc` | Web Design | Description | Elegant website for a real estate agency | Elegantna web stranica za agenciju za nekretnine | Site élégant pour une agence immobilière | **SERVICE** — No obvious issue in isolation |
| `web.portfolio.project3.desc` | Web Design | Description | Innovative website for a tech startup | Inovativna web stranica za tehnološki startup | Site innovant pour une startup tech | **SERVICE** — Agency jargon / weak differentiation |

### SEO & Google Business

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `seo.badge` | SEO | Label / copy | SEO & Google Business | SEO & Google Business | SEO & Google Business | **SERVICE** — No obvious issue in isolation |
| `seo.hero.part1` | SEO | Headline / label | Be | Budite | Soyez | **SERVICE** — No obvious issue in isolation |
| `seo.hero.emphasis` | SEO | Headline / label | visible | vidljivi | visible | **SERVICE** — No obvious issue in isolation |
| `seo.hero.part2` | SEO | Headline / label | in Google search results | u Google rezultatima pretrage | dans les résultats Google | **SERVICE** — Generic or vague outcome language |
| `seo.hero.desc` | SEO | Description | Increase your visibility in search engines and win more clients through organic search results. | Povećajte vidljivost vašeg biznisa u pretraživačima i osvojite više klijenata putem organskih rezultata pretrage. | Augmentez votre visibilité et gagnez plus de clients grâce au référencement naturel. | **SERVICE** — Generic or vague outcome language |
| `seo.hero.cta` | SEO | CTA | Free SEO audit | Besplatan SEO audit | Audit SEO gratuit | **CTA** — No obvious issue in isolation |
| `seo.services.heading` | SEO | Headline / label | Comprehensive SEO service | Kompletna SEO usluga | Un service SEO complet | **SERVICE** — Agency jargon / weak differentiation |
| `seo.services.desc` | SEO | Description | A complete SEO approach covering all aspects of digital marketing | Sveobuhvatan pristup SEO optimizaciji koji pokriva sve aspekte digitalnog marketinga | Une approche qui couvre tous les aspects du SEO | **SERVICE** — No obvious issue in isolation |
| `seo.feature.mobile` | SEO | Feature / process step | Mobile SEO | Mobile SEO | SEO mobile | **SERVICE** — No obvious issue in isolation |
| `seo.feature.technical` | SEO | Feature / process step | Technical SEO | Technical SEO | SEO technique | **SERVICE** — No obvious issue in isolation |
| `seo.pricing.heading` | SEO | Headline / label | SEO packages | SEO paketi | Formules SEO | **SERVICE** — No obvious issue in isolation |
| `seo.pricing.desc` | SEO | Description | Choose an SEO package that matches your business size and ambitions | Odaberite SEO paket koji odgovara veličini vašeg biznisa i ambicijama | Des solutions adaptées à votre ambition | **SERVICE** — No obvious issue in isolation |
| `seo.package.starter.name` | SEO | Package / deliverable | Starter SEO | Starter SEO | Starter SEO | **SERVICE** — No obvious issue in isolation |
| `seo.package.starter.desc` | SEO | Description | For small companies | Za manje kompanije | Pour les petites entreprises | **SERVICE** — No obvious issue in isolation |
| `seo.package.professional.name` | SEO | Package / deliverable | Professional SEO | Professional SEO | SEO Professionnel | **SERVICE** — No obvious issue in isolation |
| `seo.package.professional.desc` | SEO | Description | Most popular package | Najpopularniji paket | Notre formule la plus populaire | **SERVICE** — No obvious issue in isolation |
| `seo.package.enterprise.name` | SEO | Package / deliverable | Enterprise SEO | Enterprise SEO | SEO Entreprise | **SERVICE** — No obvious issue in isolation |
| `seo.package.enterprise.desc` | SEO | Description | For large companies | Za velike kompanije | Pour les leaders du marché | **SERVICE** — No obvious issue in isolation |
| `seo.cta.title` | SEO | Headline / label | Free SEO audit of your site | Besplatan SEO audit vašeg sajta | Audit SEO gratuit | **CTA** — No obvious issue in isolation |
| `seo.cta.desc` | SEO | Description | Get a free SEO audit and a custom PDF report with actionable website improvement tips. | Zatražite besplatan pregled vašeg sajta i dobijte PDF izvještaj sa konkretnim prijedlozima poboljšanja SEO performansi. | Recevez un rapport PDF avec des actions concrètes pour améliorer immédiatement votre site. | **CTA** — No obvious issue in isolation |
| `seo.cta.primary` | SEO | CTA | Request free audit | Zatražite besplatan audit | Demander un audit | **CTA** — No obvious issue in isolation |
| `seo.cta.secondary` | SEO | CTA | Call us | Pozovite nas | Nous appeler | **CTA** — No obvious issue in isolation |
| `seo.package.starter.feature1` | SEO | Feature / process step | Keyword research (20 KW) | Keyword research (20 KW) | 20 mots-clés suivis | **SERVICE** — No obvious issue in isolation |
| `seo.package.starter.feature2` | SEO | Feature / process step | On-page optimization | On-page optimizacija | Optimisation On-page | **SERVICE** — No obvious issue in isolation |
| `seo.package.starter.feature3` | SEO | Feature / process step | Google My Business setup | Google My Business setup | Configuration Google Business | **SERVICE** — No obvious issue in isolation |
| `seo.package.starter.feature4` | SEO | Feature / process step | Monthly report | Mjesečni izvještaj | Rapports mensuels | **SERVICE** — Deliverable-led; outcome is not explicit |
| `seo.package.starter.feature5` | SEO | Feature / process step | Email support | Email podrška | Support par email | **SERVICE** — Deliverable-led; outcome is not explicit |
| `seo.package.professional.feature1` | SEO | Feature / process step | Keyword research (50 KW) | Keyword research (50 KW) | 50 mots-clés suivis | **SERVICE** — No obvious issue in isolation |
| `seo.package.professional.feature2` | SEO | Feature / process step | Complete on-page optimization | Kompletna on-page optimizacija | Optimisation complète | **SERVICE** — No obvious issue in isolation |
| `seo.package.professional.feature3` | SEO | Feature / process step | Local SEO optimization | Local SEO optimizacija | SEO local | **SERVICE** — No obvious issue in isolation |
| `seo.package.professional.feature4` | SEO | Feature / process step | Content strategy | Content strategija | Stratégie de contenu | **SERVICE** — No obvious issue in isolation |
| `seo.package.professional.feature5` | SEO | Feature / process step | Bi-weekly reports | Bi-weekly izvještaji | Rapports bi-mensuels | **SERVICE** — Deliverable-led; outcome is not explicit |
| `seo.package.professional.feature6` | SEO | Feature / process step | Phone support | Telefonska podrška | Support téléphonique | **SERVICE** — Deliverable-led; outcome is not explicit |
| `seo.package.enterprise.feature1` | SEO | Feature / process step | Unlimited keyword research | Unlimited keyword research | Recherche illimitée | **SERVICE** — Claim needs evidence or qualification |
| `seo.package.enterprise.feature2` | SEO | Feature / process step | Technical SEO audit | Tehnička SEO auditacija | Audit technique | **SERVICE** — No obvious issue in isolation |
| `seo.package.enterprise.feature3` | SEO | Feature / process step | Competitor analysis | Konkurentska analiza | Analyse concurrentielle | **SERVICE** — No obvious issue in isolation |
| `seo.package.enterprise.feature4` | SEO | Feature / process step | Link building strategy | Link building strategija | Stratégie de backlinks | **SERVICE** — Deliverable-led; outcome is not explicit |
| `seo.package.enterprise.feature5` | SEO | Feature / process step | Weekly reports | Nedjeljni izvještaji | Rapports hebdomadaires | **SERVICE** — Deliverable-led; outcome is not explicit |
| `seo.package.enterprise.feature6` | SEO | Feature / process step | Dedicated SEO manager | Dedicated SEO manager | SEO manager dédié | **SERVICE** — No obvious issue in isolation |
| `seo.service.keyword.title` | SEO | Headline / label | Keyword research | Istraživanje ključnih riječi | Recherche de mots-clés | **SERVICE** — No obvious issue in isolation |
| `seo.service.keyword.description` | SEO | Description | Research focused on relevant search intent and the language your audience uses. | Istraživanje usmjereno na relevantnu namjeru pretrage i jezik koji koristi vaša publika. | Une recherche centrée sur les intentions pertinentes et le langage utilisé par votre audience. | **SERVICE** — No obvious issue in isolation |
| `seo.service.onpage.title` | SEO | Headline / label | On-page optimization | On-page optimizacija | Optimisation on-page | **SERVICE** — No obvious issue in isolation |
| `seo.service.onpage.description` | SEO | Description | Clear page structure, metadata, and content guidance for search visibility. | Jasna struktura stranica, metapodaci i smjernice za sadržaj radi vidljivosti u pretrazi. | Une structure claire, des métadonnées et des recommandations éditoriales pour la visibilité. | **SERVICE** — No obvious issue in isolation |
| `seo.service.local.title` | SEO | Headline / label | Local search presence | Prisustvo u lokalnoj pretrazi | Présence dans la recherche locale | **SERVICE** — No obvious issue in isolation |
| `seo.service.local.description` | SEO | Description | Accurate local business information and location-focused search foundations. | Tačni lokalni poslovni podaci i osnove pretrage usmjerene na lokaciju. | Des informations locales exactes et des bases adaptées aux recherches géolocalisées. | **SERVICE** — No obvious issue in isolation |
| `seo.service.reporting.title` | SEO | Headline / label | Reporting and review | Izvještavanje i analiza | Rapports et analyse | **SERVICE** — No obvious issue in isolation |
| `seo.service.reporting.description` | SEO | Description | Regular reporting that explains completed work, observed changes, and next priorities. | Redovni izvještaji koji objašnjavaju završeni rad, uočene promjene i sljedeće prioritete. | Des rapports réguliers expliquant le travail réalisé, les évolutions observées et les prochaines priorités. | **SERVICE** — No obvious issue in isolation |
| `seo.service.mobile.title` | SEO | Headline / label | Mobile search | Mobilna pretraga | Recherche mobile | **SERVICE** — No obvious issue in isolation |
| `seo.service.mobile.description` | SEO | Description | Technical and content considerations for search experiences on mobile devices. | Tehnička i sadržajna razmatranja za iskustvo pretrage na mobilnim uređajima. | Les aspects techniques et éditoriaux de l’expérience de recherche sur mobile. | **SERVICE** — No obvious issue in isolation |
| `seo.service.technical.title` | SEO | Headline / label | Technical SEO | Tehnički SEO | SEO technique | **SERVICE** — No obvious issue in isolation |
| `seo.service.technical.description` | SEO | Description | Review of crawlability, indexing, performance, and structured data foundations. | Pregled indeksiranja, pretraživanja sajta, performansi i osnova strukturiranih podataka. | Un examen de l’exploration, de l’indexation, des performances et des données structurées. | **SERVICE** — No obvious issue in isolation |

### Social Media Management

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `social.badge` | Social Media | Label / copy | Social Media Management | Social Media Management | Gestion des réseaux sociaux | **SERVICE** — No obvious issue in isolation |
| `social.hero.title` | Social Media | Headline / label | Dominate social networks | Osvajajte društvene mreže | Dominez les réseaux sociaux | **SERVICE** — Generic or vague outcome language |
| `social.hero.desc` | Social Media | Description | We build community and boost engagement through creative strategies. | Gradimo zajednicu i povećavamo angažman kroz kreativne strategije. | Nous construisons votre communauté et boostons votre engagement avec des stratégies créatives. | **SERVICE** — No obvious issue in isolation |
| `social.hero.cta` | Social Media | CTA | Start today | Počnite danas | Commencer aujourd’hui | **CTA** — CTA wording is inconsistent across pages |
| `social.services.heading` | Social Media | Headline / label | Our social media services | Naše social media usluge | Nos services social media | **SERVICE** — No obvious issue in isolation |
| `social.feature.instagram` | Social Media | Feature / process step | Instagram Management | Instagram Management | Gestion Instagram | **SERVICE** — No obvious issue in isolation |
| `social.feature.facebook` | Social Media | Feature / process step | Facebook Marketing | Facebook Marketing | Marketing Facebook | **SERVICE** — No obvious issue in isolation |
| `social.service.instagram_desc` | Social Media | Description | Content creation, stories, reels and interaction with your audience | Kreiranje sadržaja, stories, reels i interakcija sa vašom publikom | Création de contenu, stories, reels et interaction avec votre audience | **SERVICE** — No obvious issue in isolation |
| `social.service.facebook_desc` | Social Media | Description | Facebook pages, groups, Facebook Ads and community management | Facebook stranice, grupe, Facebook Ads i community management | Pages Facebook, groupes, Facebook Ads et gestion de communauté | **SERVICE** — No obvious issue in isolation |
| `social.pricing.heading` | Social Media | Headline / label | Social Media packages | Social Media paketi | Formules Social Media | **SERVICE** — No obvious issue in isolation |
| `social.package.starter.name` | Social Media | Package / deliverable | Starter Social | Starter Social | Starter Social | **SERVICE** — No obvious issue in isolation |
| `social.package.professional.name` | Social Media | Package / deliverable | Professional Social | Professional Social | Social Professionnel | **SERVICE** — No obvious issue in isolation |
| `social.package.enterprise.name` | Social Media | Package / deliverable | Enterprise Social | Enterprise Social | Social Entreprise | **SERVICE** — No obvious issue in isolation |
| `social.package.starter.feature1` | Social Media | Feature / process step | 10 posts per month | 10 postova mjesečno | 10 publications/mois | **SERVICE** — Deliverable-led; outcome is not explicit |
| `social.package.starter.feature2` | Social Media | Feature / process step | Instagram + Facebook | Instagram + Facebook | Instagram + Facebook | **SERVICE** — No obvious issue in isolation |
| `social.package.starter.feature3` | Social Media | Feature / process step | Basic content creation | Osnovno kreiranje sadržaja | Création de contenu basique | **SERVICE** — No obvious issue in isolation |
| `social.package.starter.feature4` | Social Media | Feature / process step | Monthly report | Mjesečni izvještaj | Rapport mensuel | **SERVICE** — Deliverable-led; outcome is not explicit |
| `social.package.professional.feature1` | Social Media | Feature / process step | 20 posts per month | 20 postova mjesečno | 20 publications/mois | **SERVICE** — Deliverable-led; outcome is not explicit |
| `social.package.professional.feature2` | Social Media | Feature / process step | All social networks | Sve društvene mreže | Tous réseaux sociaux | **SERVICE** — No obvious issue in isolation |
| `social.package.professional.feature3` | Social Media | Feature / process step | Professional photography | Profesionalna fotografija | Photographie pro | **SERVICE** — No obvious issue in isolation |
| `social.package.professional.feature4` | Social Media | Feature / process step | Video content | Video sadržaj | Contenu vidéo | **SERVICE** — No obvious issue in isolation |
| `social.package.professional.feature5` | Social Media | Feature / process step | Paid ads management | Upravljanje plaćenim reklamama | Gestion des publicités | **SERVICE** — No obvious issue in isolation |
| `social.package.enterprise.feature1` | Social Media | Feature / process step | Unlimited posts | Neograničen broj objava | Publications illimitées | **SERVICE** — Claim needs evidence or qualification; Deliverable-led; outcome is not explicit |
| `social.package.enterprise.feature2` | Social Media | Feature / process step | Dedicated social manager | Posvećeni social menadžer | Social manager dédié | **SERVICE** — No obvious issue in isolation |
| `social.package.enterprise.feature3` | Social Media | Feature / process step | Influencer collaborations | Saradnja sa influenserima | Collaboration avec influenceurs | **SERVICE** — No obvious issue in isolation |
| `social.package.enterprise.feature4` | Social Media | Feature / process step | Advanced analytics | Napredna analitika | Analyses avancées | **SERVICE** — No obvious issue in isolation |
| `social.cta.title` | Social Media | Headline / label | Ready for a stronger social presence? | Spremni za jače prisustvo na društvenim mrežama? | Boostez votre présence sociale | **CTA** — No obvious issue in isolation |
| `social.cta.desc` | Social Media | Description | Contact us to learn how we can grow your followers and engagement. | Kontaktirajte nas i saznajte kako možemo povećati vaše pratioce i angažman. | Contactez-nous pour développer votre audience et votre engagement. | **CTA** — CTA wording is inconsistent across pages |
| `social.cta.primary` | Social Media | CTA | Start cooperation | Početak saradnje | Commencer la collaboration | **CTA** — CTA wording is inconsistent across pages |

### Branding & Graphic Design

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `branding.badge` | Branding | Label / copy | Branding & Graphic Design | Branding & Graphic Design | Branding & Design graphique | **SERVICE** — No obvious issue in isolation |
| `branding.hero.title` | Branding | Headline / label | Build a recognizable brand | Izgradite prepoznatljiv brend | Construisez une marque inoubliable | **SERVICE** — No obvious issue in isolation |
| `branding.hero.desc` | Branding | Description | We create a visual identity that leaves a strong impression. | Kreiramo vizuelni identitet koji ostavlja jak utisak. | Nous créons une identité visuelle forte et mémorable. | **SERVICE** — Generic or vague outcome language |
| `branding.hero.cta` | Branding | CTA | Start project | Početak projekta | Démarrer votre projet | **CTA** — CTA wording is inconsistent across pages |
| `branding.services.heading` | Branding | Headline / label | Branding services | Branding usluge | Nos services de branding | **SERVICE** — No obvious issue in isolation |
| `branding.feature.identity` | Branding | Feature / process step | Brand identity | Brand identitet | Identité de marque | **SERVICE** — No obvious issue in isolation |
| `branding.pricing.heading` | Branding | Headline / label | Branding packages | Branding paketi | Formules Branding | **SERVICE** — No obvious issue in isolation |
| `branding.package.starter.name` | Branding | Package / deliverable | Starter Branding | Starter Branding | Branding Starter | **SERVICE** — No obvious issue in isolation |
| `branding.package.professional.name` | Branding | Package / deliverable | Professional Branding | Professional Branding | Branding Professionnel | **SERVICE** — No obvious issue in isolation |
| `branding.package.enterprise.name` | Branding | Package / deliverable | Enterprise Branding | Enterprise Branding | Branding Entreprise | **SERVICE** — No obvious issue in isolation |
| `branding.cta.title` | Branding | Headline / label | Ready for a new brand identity? | Spremni za novi brand identitet? | Prêt pour une nouvelle identité ? | **CTA** — No obvious issue in isolation |
| `branding.cta.desc` | Branding | Description | Contact us and together we’ll create a brand that sets you apart from the competition. | Kontaktirajte nas i kreirajmo zajedno brand koji će vas izdvojiti od konkurencije. | Construisons ensemble une marque qui se démarque vraiment. | **CTA** — CTA wording is inconsistent across pages |
| `branding.cta.primary` | Branding | CTA | Consultation | Konsultacija | Consultation | **CTA** — CTA wording is inconsistent across pages |
| `branding.service.logo_desc` | Branding | Description | Unique logo that represents your brand essence | Jedinstveni logo koji predstavlja suštinu vašeg brenda | Logo unique et fort | **SERVICE** — No obvious issue in isolation |
| `branding.service.identity_desc` | Branding | Description | Complete visual identity including colors, fonts and style | Kompletna vizuelna identifikacija uključujući boje, fontove i stil | Identité visuelle complète | **SERVICE** — No obvious issue in isolation |
| `branding.service.print_desc` | Branding | Description | Business cards, brochures, posters and other print materials | Vizit karte, brošure, plakati i ostali print materijali | Cartes, brochures, affiches et plus | **SERVICE** — No obvious issue in isolation |
| `branding.service.guidelines_desc` | Branding | Description | Detailed brand guidelines for every situation | Detaljno uputstvo za korišćenje brenda u svim situacijama | Guide de marque complet | **SERVICE** — No obvious issue in isolation |
| `branding.package.starter.feature1` | Branding | Feature / process step | Logo design | Logo dizajn | Logo personnalisé | **SERVICE** — Deliverable-led; outcome is not explicit |
| `branding.package.starter.feature2` | Branding | Feature / process step | Basic brand guide | Osnovni brand vodič | Guide graphique basique | **SERVICE** — No obvious issue in isolation |
| `branding.package.starter.feature3` | Branding | Feature / process step | Up to 2 revisions | Do 2 revizije | 2 révisions incluses | **SERVICE** — No obvious issue in isolation |
| `branding.package.starter.feature4` | Branding | Feature / process step | Business card design | Vizit karta dizajn | Design carte de visite | **SERVICE** — Deliverable-led; outcome is not explicit |
| `branding.package.starter.feature5` | Branding | Feature / process step | 3 months support | 3 mjeseca podrška | 3 mois de support | **SERVICE** — Deliverable-led; outcome is not explicit |
| `branding.package.professional.feature1` | Branding | Feature / process step | Full visual identity | Kompletan vizuelni identitet | Identité visuelle complète | **SERVICE** — No obvious issue in isolation |
| `branding.package.professional.feature2` | Branding | Feature / process step | Brand book | Brand knjiga | Brand book | **SERVICE** — No obvious issue in isolation |
| `branding.package.professional.feature3` | Branding | Feature / process step | Marketing materials | Marketing materijali | Supports marketing | **SERVICE** — No obvious issue in isolation |
| `branding.package.professional.feature4` | Branding | Feature / process step | Up to 5 revisions | Do 5 revizija | 5 révisions incluses | **SERVICE** — No obvious issue in isolation |
| `branding.package.professional.feature5` | Branding | Feature / process step | 6 months support | 6 mjeseci podrška | 6 mois de support | **SERVICE** — Deliverable-led; outcome is not explicit |
| `branding.package.enterprise.feature1` | Branding | Feature / process step | Brand strategy | Strategija brenda | Stratégie de marque | **SERVICE** — No obvious issue in isolation |
| `branding.package.enterprise.feature2` | Branding | Feature / process step | Packaging design | Packaging dizajn | Design packaging | **SERVICE** — Deliverable-led; outcome is not explicit |
| `branding.package.enterprise.feature3` | Branding | Feature / process step | Unlimited revisions | Neograničene revizije | Révisions illimitées | **SERVICE** — Claim needs evidence or qualification |
| `branding.package.enterprise.feature4` | Branding | Feature / process step | Complete identity | Kompletan identitet | Identité complète | **SERVICE** — No obvious issue in isolation |
| `branding.package.enterprise.feature5` | Branding | Feature / process step | 12 months support | 12 mjeseci podrška | 12 mois de support | **SERVICE** — Deliverable-led; outcome is not explicit |

### Strategy & Consulting

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `strategy.badge` | Strategy | Label / copy | Strategy & Consulting | Strategy & Consulting | Stratégie & Consulting | **SERVICE** — No obvious issue in isolation |
| `strategy.hero.emphasis` | Strategy | Headline / label | Strategies | Strategije | Des stratégies | **SERVICE** — No obvious issue in isolation |
| `strategy.hero.trailing` | Strategy | Headline / label | for digital success | za digitalni uspjeh | pour votre succès digital | **SERVICE** — Generic or vague outcome language |
| `strategy.hero.desc` | Strategy | Description | Expert consulting and support in implementing your strategy. | Stručne konsultacije i podrška u implementaciji strategije. | Conseils experts et accompagnement dans votre transformation digitale. | **SERVICE** — No obvious issue in isolation |
| `strategy.hero.cta` | Strategy | CTA | Consultation | Konsultacija | Consultation | **CTA** — CTA wording is inconsistent across pages |
| `strategy.services.heading` | Strategy | Headline / label | Consulting services | Konsalting usluge | Nos services de consulting | **SERVICE** — No obvious issue in isolation |
| `strategy.feature.digital` | Strategy | Feature / process step | Digital strategy | Digitalna strategija | Stratégie digitale | **SERVICE** — No obvious issue in isolation |
| `strategy.service.digital_desc` | Strategy | Description | Comprehensive digital strategy focused on your business goals | Kompletna digitalna strategija usmjerena na vaše poslovne ciljeve | Plan digital complet aligné sur vos objectifs | **SERVICE** — Agency jargon / weak differentiation |
| `strategy.feature.consulting` | Strategy | Feature / process step | Consultations | Konsultacije | Consultations | **SERVICE** — No obvious issue in isolation |
| `strategy.service.analysis_desc` | Strategy | Description | Detailed competitor and market analysis | Detaljna analiza konkurencije i mogućnosti na tržištu | Analyse de marché & concurrents | **SERVICE** — No obvious issue in isolation |
| `strategy.service.roi_desc` | Strategy | Description | Maximizing return on investment in digital marketing | Maksimiziranje povrata na investiciju u digitalni marketing | Optimisation du retour sur investissement | **SERVICE** — No obvious issue in isolation |
| `strategy.service.consulting_desc` | Strategy | Description | Expert consulting and support in implementing your strategy | Stručne konsultacije i podrška u implementaciji strategije | Accompagnement expert pour la réussite | **SERVICE** — No obvious issue in isolation |
| `strategy.pricing.heading` | Strategy | Headline / label | Strategy packages | Strategy paketi | Formules de stratégie | **SERVICE** — No obvious issue in isolation |
| `strategy.package.starter.name` | Strategy | Package / deliverable | Starter Strategy | Starter Strategy | Stratégie Starter | **SERVICE** — No obvious issue in isolation |
| `strategy.package.starter.feature1` | Strategy | Feature / process step | Business audit | Audit poslovanja | Audit d’entreprise | **SERVICE** — No obvious issue in isolation |
| `strategy.package.starter.feature2` | Strategy | Feature / process step | Basic digital strategy | Osnovna digitalna strategija | Stratégie digitale basique | **SERVICE** — No obvious issue in isolation |
| `strategy.package.starter.feature3` | Strategy | Feature / process step | 2 consultations per month | 2 konsultacije mjesečno | 2 consultations/mois | **SERVICE** — No obvious issue in isolation |
| `strategy.package.starter.feature4` | Strategy | Feature / process step | Monthly report | Mjesečni izvještaj | Rapport mensuel | **SERVICE** — Deliverable-led; outcome is not explicit |
| `strategy.package.starter.feature5` | Strategy | Feature / process step | Email support | Email podrška | Support par email | **SERVICE** — Deliverable-led; outcome is not explicit |
| `strategy.package.professional.name` | Strategy | Package / deliverable | Professional Strategy | Professional Strategy | Stratégie Professionnelle | **SERVICE** — No obvious issue in isolation |
| `strategy.package.professional.feature1` | Strategy | Feature / process step | Detailed growth strategy | Detaljna strategija rasta | Stratégie de croissance détaillée | **SERVICE** — Generic or vague outcome language |
| `strategy.package.professional.feature2` | Strategy | Feature / process step | Competitor analysis | Konkurentska analiza | Analyse des concurrents | **SERVICE** — No obvious issue in isolation |
| `strategy.package.professional.feature3` | Strategy | Feature / process step | 4 consultations per month | 4 konsultacije mjesečno | 4 consultations/mois | **SERVICE** — No obvious issue in isolation |
| `strategy.package.professional.feature4` | Strategy | Feature / process step | Bi-weekly reports | Bi-weekly izvještaji | Rapports bi-mensuels | **SERVICE** — Deliverable-led; outcome is not explicit |
| `strategy.package.professional.feature5` | Strategy | Feature / process step | Phone support | Telefonska podrška | Support téléphonique | **SERVICE** — Deliverable-led; outcome is not explicit |
| `strategy.package.enterprise.name` | Strategy | Package / deliverable | Enterprise Strategy | Enterprise Strategy | Stratégie Entreprise | **SERVICE** — No obvious issue in isolation |
| `strategy.package.enterprise.feature1` | Strategy | Feature / process step | Comprehensive transformation | Sveobuhvatna transformacija | Transformation digitale complète | **SERVICE** — Generic or vague outcome language; Agency jargon / weak differentiation |
| `strategy.package.enterprise.feature2` | Strategy | Feature / process step | Dedicated strategist | Dedicated strategist | Stratège dédié | **SERVICE** — No obvious issue in isolation |
| `strategy.package.enterprise.feature3` | Strategy | Feature / process step | Unlimited consultations | Neograničene konsultacije | Consultations illimitées | **SERVICE** — Claim needs evidence or qualification |
| `strategy.package.enterprise.feature4` | Strategy | Feature / process step | Full implementation | Puna implementacija | Implémentation totale | **SERVICE** — No obvious issue in isolation |
| `strategy.package.enterprise.feature5` | Strategy | Feature / process step | Weekly reports | Weekly izvještaji | Rapports hebdomadaires | **SERVICE** — Deliverable-led; outcome is not explicit |
| `strategy.cta.title` | Strategy | Headline / label | Ready for digital transformation? | Spremni za digitalnu transformaciju? | Prêt pour la transformation digitale ? | **CTA** — Generic or vague outcome language |
| `strategy.cta.desc` | Strategy | Description | Schedule a free consultation to see how we can help your business. | Zakažite besplatnu konsultaciju i saznajte kako možemo pomoći vašem biznisu. | Planifiez une consultation gratuite et découvrez votre potentiel. | **CTA** — No obvious issue in isolation |
| `strategy.cta.primary` | Strategy | CTA | Schedule consultation | Zakažite konsultaciju | Planifier une consultation | **CTA** — No obvious issue in isolation |

## Other marketing pages

### Free consultation

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `consultation.eyebrow` | Free Consultation | Label / copy | Free consultation | Besplatne konsultacije | Consultation gratuite | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.title` | Free Consultation | Headline / label | Let’s discuss your digital priorities | Razgovarajmo o vašim digitalnim prioritetima | Échangeons sur vos priorités digitales | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.intro` | Free Consultation | Description | Share your current challenges and goals so our team can prepare a focused consultation. | Podijelite trenutne izazove i ciljeve kako bi naš tim pripremio fokusirane konsultacije. | Présentez-nous vos défis et vos objectifs afin que notre équipe prépare une consultation ciblée. | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.benefits.title` | Free Consultation | Headline / label | Consultation benefits | Prednosti konsultacija | Avantages de la consultation | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.benefit.duration.title` | Free Consultation | Headline / label | 45 minutes | 45 minuta | 45 minutes | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.benefit.duration.description` | Free Consultation | Description | Time reserved for a focused review and practical discussion. | Vrijeme rezervisano za fokusiranu analizu i praktičan razgovor. | Un temps réservé à une analyse ciblée et à un échange pratique. | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.benefit.tailored.title` | Free Consultation | Headline / label | Tailored discussion | Prilagođen razgovor | Échange personnalisé | **CONTACT MARKETING COPY** — Agency jargon / weak differentiation |
| `consultation.benefit.tailored.description` | Free Consultation | Description | The conversation is based on the context you provide. | Razgovor se zasniva na kontekstu koji nam dostavite. | La discussion repose sur le contexte que vous nous fournissez. | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.benefit.free.title` | Free Consultation | Headline / label | No consultation fee | Bez naknade | Sans frais | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.benefit.free.description` | Free Consultation | Description | The introductory consultation has no fee or obligation. | Uvodne konsultacije su bez naknade i obaveze. | La consultation initiale est sans frais et sans engagement. | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.expect.title` | Free Consultation | Headline / label | What to expect | Šta možete očekivati | À quoi vous attendre | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.expect.review` | Free Consultation | Label / copy | Review of your current situation | Pregled trenutnog stanja | Examen de votre situation actuelle | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.expect.strategy` | Free Consultation | Label / copy | Discussion of possible priorities | Razgovor o mogućim prioritetima | Discussion des priorités possibles | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.expect.advice` | Free Consultation | Label / copy | Practical next-step guidance | Praktične smjernice za sljedeće korake | Conseils pratiques sur les prochaines étapes | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.expect.proposal` | Free Consultation | Label / copy | A proposal when appropriate | Ponuda kada je to primjereno | Une proposition, le cas échéant | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.form.title` | Free Consultation | Headline / label | Request a consultation | Zatražite konsultacije | Demander une consultation | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `consultation.form.description` | Free Consultation | Description | Complete the form below so we can prepare for the conversation. | Popunite obrazac kako bismo se pripremili za razgovor. | Remplissez le formulaire afin que nous puissions préparer notre échange. | **CONTACT MARKETING COPY** — No obvious issue in isolation |

### Service inquiry

| Key | Page | Element | Current EN | Current ME | Current FR | Review note |
|---|---|---|---|---|---|---|
| `inquiry.title` | Service Inquiry | Headline / label | Request a quote | Upit za ponudu | Demande de devis | **CONTACT MARKETING COPY** — No obvious issue in isolation |
| `inquiry.subtitle` | Service Inquiry | Headline / label | Fill out the form below so we can prepare a personalized quote for your project. | Popunite formu ispod da bismo pripremili personalizovanu ponudu za vaš projekat. | Remplissez le formulaire pour un devis personnalisé. | **CONTACT MARKETING COPY** — No obvious issue in isolation |

## CTAs

| Location | Current CTA | Destination | Primary/Secondary | Review note |
|---|---|---|---|---|
| Global navigation / floating CTA | Free consultation | Free-consultation page | Primary | Used as a generic global CTA despite website-specific key naming |
| Homepage hero | Free consultation | Free-consultation page | Primary | Used as a generic global CTA despite website-specific key naming |
| Homepage hero | View our work | Homepage portfolio section | Secondary | Clear secondary action |
| Homepage services unsure prompt | Free consultation | Free-consultation page | Primary | Used as a generic global CTA despite website-specific key naming |
| Web Design hero | Start a project | Service-inquiry page | Primary | Multiple verbs and offer labels weaken consistency |
| Web Design closing | Free consultation | Free-consultation page | Primary | Used as a generic global CTA despite website-specific key naming |
| Web Design closing | Call us | Telephone link | Secondary | Clear secondary action |
| SEO hero | Free SEO audit | Service-inquiry page | Primary | Multiple verbs and offer labels weaken consistency |
| SEO closing | Request free audit | Service-inquiry page | Primary | Multiple verbs and offer labels weaken consistency |
| Social Media hero | Start today | Service-inquiry page | Primary | Multiple verbs and offer labels weaken consistency |
| Social Media closing | Start cooperation | Service-inquiry page | Primary | Multiple verbs and offer labels weaken consistency |
| Branding hero | Start project | Service-inquiry page | Primary | Multiple verbs and offer labels weaken consistency |
| Branding closing | Consultation | Service-inquiry page | Primary | Multiple verbs and offer labels weaken consistency |
| Strategy hero | Consultation | Service-inquiry page | Primary | Multiple verbs and offer labels weaken consistency |
| Strategy closing | Schedule consultation | Service-inquiry page | Primary | Multiple verbs and offer labels weaken consistency |
| All package cards | Choose package | Service-inquiry page with package query | Primary | Multiple verbs and offer labels weaken consistency |
| All service pages | Back to home | Homepage | Secondary | Clear secondary action |
| Free Consultation form | Schedule free consultation | Submit consultation request | Primary | Multiple verbs and offer labels weaken consistency |

## SEO titles and descriptions

Open Graph and Twitter titles/descriptions are populated from the same route metadata, so there is no materially different social copy to list separately.

| Route | EN title | EN description | ME | FR | Review note |
|---|---|---|---|---|---|
| home | DIAL Digital Agency \| Digital Marketing & Web Design in Montenegro | DIAL Digital is a full-service digital agency delivering design, marketing, and growth solutions across Montenegro. | **Title:** DIAL Digital agencija \| Digitalni marketing i web dizajn<br>**Description:** DIAL Digital je full-service digitalna agencija iz Crne Gore koja isporučuje dizajn, marketing i strategije rasta. | **Title:** Agence DIAL Digital \| Marketing digital et conception web au Monténégro<br>**Description:** DIAL Digital est une agence full-service qui fournit des solutions de design, de marketing et de croissance au Monténégro. | **SEO TITLE / SEO DESCRIPTION** — Generic or vague outcome language |
| web-design | Web Design & Development \| DIAL Digital Agency | We craft modern, responsive websites that are optimized for conversions and business growth. | **Title:** Web dizajn i development \| DIAL Digital agencija<br>**Description:** Pravimo moderne, responzivne sajtove optimizovane za konverzije i rast vašeg biznisa. | **Title:** Conception et développement web \| Agence DIAL Digital<br>**Description:** Nous créons des sites modernes et responsives, optimisés pour la conversion et la croissance de votre entreprise. | **SEO TITLE / SEO DESCRIPTION** — Generic or vague outcome language |
| seo | SEO Services in Montenegro \| DIAL Digital Agency | Increase your search visibility and win more clients with our comprehensive SEO services. | **Title:** SEO usluge u Crnoj Gori \| DIAL Digital agencija<br>**Description:** Povećajte vidljivost na pretraživačima i osvojite više klijenata uz naš SEO tim. | **Title:** Services SEO au Monténégro \| Agence DIAL Digital<br>**Description:** Améliorez votre visibilité sur les moteurs de recherche et gagnez plus de clients grâce à notre équipe SEO. | **SEO TITLE / SEO DESCRIPTION** — Agency jargon / weak differentiation |
| social-media | Social Media Marketing Services \| DIAL Digital Agency | Grow your brand community and engagement with data-driven social media strategies. | **Title:** Upravljanje društvenim mrežama \| DIAL Digital agencija<br>**Description:** Gradimo vašu zajednicu i povećavamo angažman kroz kreativne kampanje na društvenim mrežama. | **Title:** Marketing des réseaux sociaux \| Agence DIAL Digital<br>**Description:** Développez votre communauté et l'engagement grâce à des campagnes créatives sur les réseaux sociaux. | **SEO TITLE / SEO DESCRIPTION** — Agency jargon / weak differentiation |
| branding | Branding & Graphic Design \| DIAL Digital Agency | Build a memorable visual identity with bespoke branding and design solutions from our creative team. | **Title:** Brending i grafički dizajn \| DIAL Digital agencija<br>**Description:** Razvijamo prepoznatljiv vizuelni identitet i profesionalne marketinške materijale za vaš brend. | **Title:** Branding et design graphique \| Agence DIAL Digital<br>**Description:** Nous élaborons une identité visuelle distinctive et des supports marketing professionnels pour votre marque. | **SEO TITLE / SEO DESCRIPTION** — Agency jargon / weak differentiation |
| strategy | Digital Strategy & Consulting \| DIAL Digital Agency | Develop a data-driven digital strategy that accelerates growth and delivers measurable results. | **Title:** Digitalna strategija i konsalting \| DIAL Digital agencija<br>**Description:** Planovi zasnovani na podacima koji ubrzavaju rast i prodaju vašeg poslovanja. | **Title:** Stratégie digitale et conseil \| Agence DIAL Digital<br>**Description:** Des plans fondés sur les données qui accélèrent la croissance et les ventes de votre entreprise. | **SEO TITLE / SEO DESCRIPTION** — Generic or vague outcome language; Agency jargon / weak differentiation |
| service-inquiry | Request a Project Quote \| DIAL Digital Agency | Tell us about your project and receive a tailored proposal from the DIAL Digital team within 24 hours. | **Title:** Zatražite ponudu \| DIAL Digital agencija<br>**Description:** Pošaljite detalje projekta i dobićete personalizovanu ponudu u roku od 24 sata. | **Title:** Demander une proposition \| Agence DIAL Digital<br>**Description:** Envoyez les détails de votre projet et recevez une proposition personnalisée en 24 heures. | **SEO TITLE / SEO DESCRIPTION** — Agency jargon / weak differentiation |
| free-consultation | Book a Free Consultation \| DIAL Digital Agency | Schedule a free consultation with our digital experts to discover growth opportunities for your business. | **Title:** Besplatne konsultacije \| DIAL Digital agencija<br>**Description:** Rezervišite besplatan razgovor sa našim timom digitalnog marketinga i saznajte kako možemo pomoći. | **Title:** Réservez une consultation gratuite \| Agence DIAL Digital<br>**Description:** Planifiez un appel gratuit avec notre équipe marketing pour découvrir comment nous pouvons vous aider. | **SEO TITLE / SEO DESCRIPTION** — Generic or vague outcome language |

## Repeated/generic phrases

| Repeated idea | Locations | Review note |
|---|---|---|
| “results” / “deliver results” | Homepage hero; services; Web Design; Strategy; About; SEO metadata | Dominant generic promise, usually without a metric or mechanism. |
| “digital success” / “your success” | Services heading; Strategy hero; About/team legacy framing; footer | Repeats a broad, undefined destination. |
| “transform your business / presence” | Homepage hero; contact; Web Design CTA; Strategy | Transformation is asserted rather than demonstrated. |
| “grow / growth” | Strategy guidance and packages; social CTA/SEO; route metadata | Audience, baseline and business outcome are rarely specified. |
| “increase visibility / visible” | SEO hero and SEO metadata | Repeated search benefit; relationship to qualified demand is unclear. |
| “data-driven” | Homepage tagline; social and strategy metadata | Familiar agency phrase with no explanation of data, method or decisions. |
| “comprehensive / complete” | SEO and Strategy services; package language | Scope-heavy adjective does not establish distinct value. |
| “free consultation” | Global CTA, multiple closing sections, consultation page, SEO CTA/audit | Offer is common but naming alternates among consultation, audit and project start. |

## Terminology inconsistencies

| Concept | Current terms | Issue |
|---|---|---|
| Agency category | digital agency; full-service digital agency; modern digital agency | No consistent category/positioning phrase. |
| Web work | Web Design & Development; web development; websites; Web design | Scope and capitalization vary. |
| Search | SEO & Google Business; SEO; SEO optimization; Google My Business; local search presence | “Google Business” and obsolete/variant “Google My Business” compete with local SEO terminology. |
| Social offer | Social Media Management; Social Media Marketing Services; social networks; paid advertising; Paid ads management | Management, marketing, channel and media-buying scope are blurred. |
| Strategy | Strategy & Consulting; Digital Strategy & Consulting; growth strategy; digital transformation | Service boundaries and intended outcome are inconsistent. |
| Measurement | Analytics; reporting; measurable results; ROI optimization; conversion | Metrics and measurement approach are not connected or defined. |
| Conversion action | Free consultation; Consultation; Start project; Start cooperation; Start today; Request free audit | Visitors see inconsistent offer names and commitment levels. |
| Business result | clients; customers; followers; engagement; sales; growth; results; success | Outcome vocabulary changes without identifying the primary audience or funnel stage. |

## Unsupported or questionable claims

- “Digital marketing that works,” “deliver results,” “measurable results,” and similar performance claims lack evidence or an explicit measurement standard.
- “One of Montenegro’s leading real-estate agencies” is a comparative status claim requiring client identity and substantiation.
- Package promises such as “Unlimited pages,” “Unlimited posts,” “Unlimited revisions,” “Unlimited consultations,” and “Unlimited keyword research” need commercial qualification.
- The Web Design page displays “Uptime” as a hard-coded stat label alongside numeric claims; the source and service-level meaning require verification.
- “Within 24 hours” in quote metadata and response-time framing should be operationally validated.
- “Free SEO audit” and “custom PDF report” should be checked against the actual fulfillment process.
- Current public portfolio and testimonial areas explicitly indicate pending approval/development content; these placeholders were excluded from the copy tables as requested, but they create a critical credibility gap if deployed publicly.

## English copy priorities

### CRITICAL

1. Replace or substantiate unpublished portfolio narratives, team profiles and testimonials before treating the site as credible proof.
2. Clarify DIAL’s audience, differentiated value proposition and reason to believe in the homepage hero and footer positioning.
3. Validate every numerical, comparative, time-bound and “unlimited” claim.

### HIGH

1. Reduce repeated generic promises around results, success, growth and transformation across the homepage and service heroes.
2. Align the conversion architecture and offer naming: consultation, audit, quote, project start and cooperation currently imply different next steps.
3. Standardize service names, especially SEO/Google Business, social management/marketing and strategy/consulting.
4. Shift package and feature copy from lists of deliverables toward buyer outcomes, constraints and fit.

### MEDIUM

1. Make process copy more specific to DIAL’s working model, decision criteria and measurement cadence.
2. Tighten long About/approach sentences and remove overlapping claims.
3. Align SEO descriptions with on-page propositions and verified geographic/service scope.

### LOW

1. Normalize capitalization, hyphenation and terms such as “on-page,” “e-commerce,” “Web Design,” and “Google Business.”
2. Review low-information labels such as “Our Services,” “Our Work,” and “Consulting services” after positioning is agreed.

## Extraction notes and hard-coded marketing copy

The following rendered items do not originate in locale JSON and therefore have no localized ME/FR variants in source:

| Source | Page / section | Current copy | Classification | Review note |
|---|---|---|---|---|
| `PortfolioSection.tsx` | Homepage portfolio | Montenegrin Properties | PORTFOLIO / CASE STUDY | Project title requires owner/client approval. |
| `PortfolioSection.tsx` | Homepage portfolio | Adriatic Adventures | PORTFOLIO / CASE STUDY | Project title requires owner/client approval. |
| `PortfolioSection.tsx` | Homepage portfolio | TechStart Montenegro | PORTFOLIO / CASE STUDY | Project title requires owner/client approval. |
| `WebDesignPage.tsx` | Web Design portfolio | Restoran Konoba | PORTFOLIO / CASE STUDY | Hard-coded and not localizable. |
| `WebDesignPage.tsx` | Web Design portfolio | Montenegro Properties | PORTFOLIO / CASE STUDY | Inconsistent with homepage “Montenegrin Properties.” |
| `WebDesignPage.tsx` | Web Design portfolio | Tech Startup | PORTFOLIO / CASE STUDY | Generic title and inconsistent with “TechStart Montenegro.” |
| `WebDesignPage.tsx` | Web Design hero stats | Uptime | PROOF / TESTIMONIAL | Hard-coded metric label; underlying claim needs verification. |

## Source map

- Locale master and translations: `src/locales/en.json`, `src/locales/me.json`, `src/locales/fr.json`.
- Homepage composition and reusable sections: `src/routes.tsx` and `src/components/*.tsx`.
- Service-page composition: `src/components/services/*.tsx`.
- Route SEO, Open Graph and Twitter content: `src/config/seo-meta.ts` and `src/routes.tsx`.
- Localized destinations: `src/locales/routes.json` and `src/routing.ts`.
