import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Monitor, 
  Smartphone, 
  Zap, 
  Search, 
  ShoppingCart, 
  Palette,
  Code,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Star
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useRouter } from '../Router';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function WebDesignPage() {
  const { t } = useLanguage();
  const { navigateTo } = useRouter();

  const features = [
    {
      icon: Monitor,
      title: 'Responzivni dizajn',
      description: 'Web stranice koje savršeno rade na svim uređajima - desktop, tablet i mobilni'
    },
    {
      icon: Zap,
      title: 'Optimizacija brzine',
      description: 'Optimizujemo svaku stranicu za maksimalnu brzinu učitavanja'
    },
    {
      icon: Search,
      title: 'SEO optimizovano',
      description: 'Izgrađeno za pretraživače od prvog dana'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce rešenja',
      description: 'Kompletan online shop sa payment gateway integracijom'
    },
    {
      icon: Palette,
      title: 'Jedinstveni dizajn',
      description: 'Kreativni dizajni koji odražavaju identitet vašeg brenda'
    },
    {
      icon: Code,
      title: 'Čist kod',
      description: 'Moderan, maintainable kod koji prati najbolje prakse'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Planiranje i analiza',
      description: 'Analiziramo vaše potrebe, ciljeve i konkurenciju',
      duration: '1-2 nedelje'
    },
    {
      step: '02', 
      title: 'Dizajn i prototip',
      description: 'Kreiramo wireframes i visoko-fidelni dizajn',
      duration: '2-3 nedelje'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Kodiramo web stranicu koristeći najnovije tehnologije',
      duration: '3-4 nedelje'
    },
    {
      step: '04',
      title: 'Testiranje i lansiranje',
      description: 'Testiramo sve funkcionalnosti i lansiramo sajt',
      duration: '1 nedelja'
    }
  ];

  const packages = [
    {
      name: 'Starter',
      price: '€1,200',
      description: 'Idealno za manje kompanije',
      features: [
        'Do 5 stranica',
        'Responzivni dizajn', 
        'Kontakt forma',
        'Osnovni SEO',
        '3 meseca podrška'
      ],
      popular: false
    },
    {
      name: 'Professional', 
      price: '€2,500',
      description: 'Najpopularniji paket',
      features: [
        'Do 15 stranica',
        'Custom dizajn',
        'CMS sistem',
        'Napredni SEO',
        'Google Analytics',
        '6 meseci podrška'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '€5,000+',
      description: 'Za velike kompanije',
      features: [
        'Neograničen broj stranica',
        'E-commerce funkcionalnost',
        'API integracije',
        'Multilingvalni sajt',
        'Premium podrška',
        '12 meseci podrška'
      ],
      popular: false
    }
  ];

  const portfolio = [
    {
      title: 'Restoran Konoba',
      category: 'Restaurant Website',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      description: 'Moderna web stranica za tradicionalni restoran sa online rezervacijama'
    },
    {
      title: 'Montenegro Properties',
      category: 'Real Estate',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
      description: 'Elegantna web stranica za agenciju za nekretnine'
    },
    {
      title: 'Tech Startup',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      description: 'Inovativna web stranica za tehnološki startup'
    }
  ];

  const handlePackageSelect = (packageName: string) => {
    navigateTo('service-inquiry', {
      service: 'web-design',
      package: packageName
    });
  };

  const handleConsultation = () => {
    navigateTo('service-inquiry', {
      service: 'web-design'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-bdigital-navy via-bdigital-dark-navy to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-bdigital-cyan/20 text-bdigital-cyan border-bdigital-cyan mb-4">
                Web Design & Development
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Kreiramo <span className="text-bdigital-cyan">moderne web stranice</span> koje prodaju
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Od ideje do realizacije - razvijamo web stranice koje kombinuju izuzetan dizajn sa funkcionalnosti koja donosi rezultate.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
                  onClick={handleConsultation}
                >
                  Započni projekat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-bdigital-cyan text-bdigital-cyan hover:bg-bdigital-cyan hover:text-bdigital-navy px-8 py-3 font-semibold"
                  onClick={() => navigateTo('home')}
                >
                  Nazad na početnu
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-600">
                <div>
                  <div className="text-2xl font-bold text-bdigital-cyan">50+</div>
                  <div className="text-gray-400 text-sm">Web sajtova</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-bdigital-cyan">99%</div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-bdigital-cyan">24h</div>
                  <div className="text-gray-400 text-sm">Podrška</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=400&fit=crop"
                  alt="Web development"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bdigital-navy mb-4">
              Što dobijate sa našim web stranicama
            </h2>
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              Svaka web stranica koju kreiramo uključuje sve što vam je potrebno za uspeh online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-bdigital-cyan/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-bdigital-cyan group-hover:text-white transition-all duration-300">
                      <IconComponent className="h-6 w-6 text-bdigital-cyan group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-bdigital-navy mb-3">{feature.title}</h3>
                    <p className="text-neutral-gray leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bdigital-navy mb-4">
              Naš proces rada
            </h2>
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              Transparentan i strukturisan pristup koji garantuje uspeh vašeg projekta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-bdigital-cyan rounded-2xl flex items-center justify-center mx-auto mb-4 text-bdigital-navy text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-bdigital-navy mb-2">{step.title}</h3>
                  <p className="text-neutral-gray text-sm mb-2">{step.description}</p>
                  <div className="flex items-center justify-center gap-1 text-bdigital-cyan text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{step.duration}</span>
                  </div>
                </div>
                {/* Connection line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-bdigital-cyan/30 transform translate-x-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bdigital-navy mb-4">
              Paketi i cene
            </h2>
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              Odaberite paket koji najbolje odgovara vašim potrebama i budžetu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${pkg.popular ? 'ring-2 ring-bdigital-cyan' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-bdigital-cyan text-bdigital-navy px-4 py-1">
                      Najpopularniji
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl text-bdigital-navy">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-bdigital-cyan mb-2">{pkg.price}</div>
                  <p className="text-neutral-gray text-sm">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-bdigital-cyan mr-3 flex-shrink-0" />
                        <span className="text-neutral-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light' : 'border border-bdigital-cyan text-bdigital-cyan hover:bg-bdigital-cyan hover:text-bdigital-navy'} font-semibold`}
                    variant={pkg.popular ? 'default' : 'outline'}
                    onClick={() => handlePackageSelect(pkg.name)}
                  >
                    Odaberi paket
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bdigital-navy mb-4">
              Naši radovi
            </h2>
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              Pogledajte neke od web stranica koje smo kreirali za naše klijente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-bdigital-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-bdigital-navy"
                    >
                      Pogledaj više
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3 text-xs">
                    {project.category}
                  </Badge>
                  <h3 className="text-lg font-bold text-bdigital-navy mb-2">{project.title}</h3>
                  <p className="text-neutral-gray text-sm">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bdigital-navy to-bdigital-dark-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Spremni za vašu novu web stranicu?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Kontaktirajte nas danas za besplatnu konsultaciju i saznajte kako možemo transformisati vaše online prisustvo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
              onClick={handleConsultation}
            >
              Besplatna konsultacija
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-bdigital-cyan text-bdigital-cyan hover:bg-bdigital-cyan hover:text-bdigital-navy px-8 py-3 font-semibold"
              onClick={handleConsultation}
            >
              Pozovite nas
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}