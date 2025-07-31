import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Search,
  TrendingUp,
  BarChart3,
  MapPin,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Award
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useRouter } from '../Router';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function SEOPage() {
  const { t } = useLanguage();
  const { navigateTo } = useRouter();

  const services = [
    {
      icon: Search,
      title: t('services.seo.feature1'),
      description: t('seo.service.keyword_desc')
    },
    {
      icon: TrendingUp,
      title: t('services.seo.feature2'),
      description: t('seo.service.onpage_desc')
    },
    {
      icon: MapPin,
      title: t('services.seo.feature3'),
      description: t('seo.service.local_desc')
    },
    {
      icon: BarChart3,
      title: t('services.seo.feature4'),
      description: t('seo.service.reporting_desc')
    },
    {
      icon: Smartphone,
      title: t('seo.feature.mobile'),
      description: t('seo.feature.mobile_desc')
    },
    {
      icon: Globe,
      title: t('seo.feature.technical'),
      description: t('seo.feature.technical_desc')
    }
  ];

  const results = [
    {
      metric: '300%',
      label: t('seo.result.traffic.label'),
      description: t('seo.result.traffic.desc')
    },
    {
      metric: '#1',
      label: t('seo.result.position.label'),
      description: t('seo.result.position.desc')
    },
    {
      metric: '150%',
      label: t('seo.result.conversions.label'),
      description: t('seo.result.conversions.desc')
    },
    {
      metric: '50+',
      label: t('seo.result.clients.label'),
      description: t('seo.result.clients.desc')
    }
  ];

  const packages = [
    {
      name: t('seo.package.starter.name'),
      price: '500 €/mes',
      description: t('seo.package.starter.desc'),
      features: [
        t('seo.package.starter.feature1'),
        t('seo.package.starter.feature2'),
        t('seo.package.starter.feature3'),
        t('seo.package.starter.feature4'),
        t('seo.package.starter.feature5')
      ],
      popular: false
    },
    {
      name: t('seo.package.professional.name'),
      price: '800 €/mes',
      description: t('seo.package.professional.desc'),
      features: [
        t('seo.package.professional.feature1'),
        t('seo.package.professional.feature2'),
        t('seo.package.professional.feature3'),
        t('seo.package.professional.feature4'),
        t('seo.package.professional.feature5'),
        t('seo.package.professional.feature6')
      ],
      popular: true
    },
    {
      name: t('seo.package.enterprise.name'),
      price: '1.500 €/mes',
      description: t('seo.package.enterprise.desc'),
      features: [
        t('seo.package.enterprise.feature1'),
        t('seo.package.enterprise.feature2'),
        t('seo.package.enterprise.feature3'),
        t('seo.package.enterprise.feature4'),
        t('seo.package.enterprise.feature5'),
        t('seo.package.enterprise.feature6')
      ],
      popular: false
    }
  ];

  const caseStudies = [
    {
      client: 'Montenegrin Properties',
      industry: t('seo.case.study1.industry'),
      challenge: t('seo.case.study1.challenge'),
      solution: t('seo.case.study1.solution'),
      results: [
        t('seo.case.study1.result1'),
        t('seo.case.study1.result2'),
        t('seo.case.study1.result3')
      ],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'
    },
    {
      client: 'Adriatic Adventures',
      industry: t('seo.case.study2.industry'),
      challenge: t('seo.case.study2.challenge'),
      solution: t('seo.case.study2.solution'),
      results: [
        t('seo.case.study2.result1'),
        t('seo.case.study2.result2'),
        t('seo.case.study2.result3')
      ],
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
    }
  ];

  const handlePackageSelect = (packageName: string) => {
    navigateTo('service-inquiry', {
      service: 'seo',
      package: packageName
    });
  };

  const handleConsultation = () => {
    navigateTo('service-inquiry', {
      service: 'seo'
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
                {t('seo.badge')}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t('seo.hero.part1')}{' '}
                <span className="text-bdigital-cyan">{t('seo.hero.emphasis')}</span>{' '}
                {t('seo.hero.part2')}
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {t('seo.hero.desc')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
                  onClick={handleConsultation}
                >
                  {t('seo.hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-bdigital-cyan text-bdigital-cyan hover:bg-bdigital-cyan hover:text-bdigital-navy px-8 py-3 font-semibold"
                  onClick={() => navigateTo('home')}
                >
                  {t('general.back_home')}
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-600">
                <div>
                  <div className="text-2xl font-bold text-bdigital-cyan">300%</div>
                  <div className="text-gray-400 text-xs">Avg. traffic boost</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-bdigital-cyan">6</div>
                  <div className="text-gray-400 text-xs">Meseci do rezultata</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-bdigital-cyan">200+</div>
                  <div className="text-gray-400 text-xs">Keywords ranked</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-bdigital-cyan">95%</div>
                  <div className="text-gray-400 text-xs">Client retention</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop"
                  alt="SEO Analytics"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bdigital-navy mb-4">
              {t('seo.services.heading')}
            </h2>
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              {t('seo.services.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-bdigital-cyan/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-bdigital-cyan group-hover:text-white transition-all duration-300">
                      <IconComponent className="h-6 w-6 text-bdigital-cyan group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-bdigital-navy mb-3">{service.title}</h3>
                    <p className="text-neutral-gray leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bdigital-navy mb-4">
              {t('seo.results.heading')}
            </h2>
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              {t('seo.results.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, index) => (
              <Card key={index} className="border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-bdigital-cyan mb-2 group-hover:scale-110 transition-transform duration-300">
                    {result.metric}
                  </div>
                  <h3 className="font-bold text-bdigital-navy mb-2">{result.label}</h3>
                  <p className="text-neutral-gray text-sm">{result.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bdigital-navy mb-4">
              {t('seo.pricing.heading')}
            </h2>
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              {t('seo.pricing.desc')}
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
                    {t('packages.select')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-bdigital-navy mb-4">
              {t('seo.case.heading')}
            </h2>
            <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
              {t('seo.case.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={study.image}
                    alt={study.client}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-bdigital-cyan text-bdigital-navy">
                      {study.industry}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-bdigital-navy mb-2">{study.client}</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-bdigital-navy mb-1">Izazov:</h4>
                    <p className="text-neutral-gray text-sm">{study.challenge}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-bdigital-navy mb-1">Rešenje:</h4>
                    <p className="text-neutral-gray text-sm">{study.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-bdigital-navy mb-2">Rezultati:</h4>
                    <ul className="space-y-1">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <Star className="h-4 w-4 text-bdigital-cyan mr-2 flex-shrink-0" />
                          <span className="text-neutral-gray">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bdigital-navy to-bdigital-dark-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="h-16 w-16 text-bdigital-cyan mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('seo.cta.title')}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t('seo.cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
              onClick={handleConsultation}
            >
              {t('seo.cta.primary')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-bdigital-cyan text-bdigital-cyan hover:bg-bdigital-cyan hover:text-bdigital-navy px-8 py-3 font-semibold"
              onClick={handleConsultation}
            >
              {t('seo.cta.secondary')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}