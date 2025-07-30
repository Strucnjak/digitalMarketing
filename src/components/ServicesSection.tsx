import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Monitor, 
  Search, 
  Share2, 
  Palette, 
  Target, 
  ArrowRight,
  Zap,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useRouter } from './Router';

export function ServicesSection() {
  const { t: _t } = useLanguage();
  const { navigateTo } = useRouter();

  const services = [
    {
      id: 'web-design',
      icon: Monitor,
      title: 'Web Design & Development',
      description: 'Kreiramo moderne, responzivne web stranice koje kombinuju izuzetan dizajn sa funkcionalnosti koja konvertuje posetioce u klijente.',
      features: ['Responzivni dizajn', 'SEO optimizovano', 'CMS integracija', 'E-commerce'],
      color: 'from-blue-500 to-cyan-500',
      stats: { value: '50+', label: 'Web stranica' }
    },
    {
      id: 'seo',
      icon: Search,
      title: 'SEO & Google Business',
      description: 'Povećajte vidljivost na Google pretragama i osvojite više klijenata organskim rezultatima pretrage.',
      features: ['Keyword research', 'On-page SEO', 'Local SEO', 'Analytics'],
      color: 'from-green-500 to-emerald-500',
      stats: { value: '300%', label: 'Avg. povećanje' }
    },
    {
      id: 'social-media',
      icon: Share2,
      title: 'Social Media Management',
      description: 'Izgradite jaku zajednicu oko vašeg brenda kroz angažovan sadržaj na društvenim mrežama.',
      features: ['Content creation', 'Community management', 'Paid advertising', 'Analytics'],
      color: 'from-purple-500 to-pink-500',
      stats: { value: '10K+', label: 'Followers gained' }
    },
    {
      id: 'branding',
      icon: Palette,
      title: 'Branding & Graphic Design',
      description: 'Kreirajte nezaboravan brand identitet koji će vas izdvojiti od konkurencije i privući idealne klijente.',
      features: ['Logo design', 'Brand guidelines', 'Print materials', 'Digital assets'],
      color: 'from-orange-500 to-red-500',
      stats: { value: '100+', label: 'Brand identiteta' }
    },
    {
      id: 'strategy',
      icon: Target,
      title: 'Strategy & Consulting',
      description: 'Razvijamo sveobuhvatne digitalne strategije koje su usklađene sa vašim poslovnim ciljevima.',
      features: ['Market analysis', 'Competitor research', 'ROI optimization', 'Growth strategy'],
      color: 'from-indigo-500 to-purple-500',
      stats: { value: '250%', label: 'ROI povećanje' }
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    navigateTo(serviceId as any);
  };

  const handleViewAll = () => {
    navigateTo('service-inquiry');
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <Badge className="bg-bdigital-cyan/10 text-bdigital-cyan border-bdigital-cyan/20 mb-4 px-4 py-2">
            Naše usluge
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bdigital-navy mb-4 lg:mb-6">
            Digitalne usluge za<br />
            <span className="text-bdigital-cyan">vaš uspeh</span>
          </h2>
          <p className="text-lg lg:text-xl text-neutral-gray max-w-3xl mx-auto leading-relaxed">
            Od web development-a do kompletnih marketing strategija - pomažemo vašem biznisu da ostvari maksimalan potencijal u digitalnom svetu.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {services.map((service, _index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.id} 
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-white overflow-hidden"
                onClick={() => handleServiceClick(service.id)}
              >
                <CardHeader className="pb-4">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Title and Stats */}
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl lg:text-2xl font-bold text-bdigital-navy group-hover:text-bdigital-cyan transition-colors duration-300 flex-1">
                      {service.title}
                    </CardTitle>
                    <div className="text-right ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-lg font-bold text-bdigital-cyan">{service.stats.value}</div>
                      <div className="text-xs text-neutral-gray">{service.stats.label}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-neutral-gray leading-relaxed mb-4 lg:mb-6">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-bdigital-cyan rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-neutral-gray">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-bdigital-cyan hover:text-bdigital-navy hover:bg-bdigital-cyan/10 font-semibold p-4 group-hover:bg-bdigital-cyan group-hover:text-bdigital-navy transition-all duration-300"
                  >
                    Saznajte više
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-bdigital-navy to-bdigital-dark-navy rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
                Zašto odabrati <span className="text-bdigital-cyan">BDigital</span>?
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 lg:mb-8">
                Kombinujemo kreativnost sa tehnologijom da kreiramo rešenja koja ne samo da izgledaju odlično, već i donose merljive rezultate za vaš biznis.
              </p>
              <Button
                onClick={handleViewAll}
                className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Započnite projekat
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
              {[
                { icon: Zap, title: 'Brza implementacija', desc: 'Projekti se završavaju u roku' },
                { icon: TrendingUp, title: 'Merljivi rezultati', desc: 'ROI koji možete videti' },
                { icon: Users, title: 'Posvećena podrška', desc: '24/7 tehnička podrška' },
                { icon: Award, title: 'Dokazano iskustvo', desc: '100+ uspešnih projekata' }
              ].map((item, _index) => {
                const IconComponent = item.icon;
                return (
                  <div key={_index} className="text-center group">
                    <div className="w-12 h-12 bg-bdigital-cyan/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-bdigital-cyan group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="h-6 w-6 text-bdigital-cyan group-hover:text-bdigital-navy" />
                    </div>
                    <h4 className="font-semibold text-sm lg:text-base mb-1">{item.title}</h4>
                    <p className="text-xs lg:text-sm text-gray-400">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}