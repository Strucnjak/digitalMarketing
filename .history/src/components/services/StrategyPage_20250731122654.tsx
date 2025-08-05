import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  TrendingUp,
  Target,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useRouter } from '../Router';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../LanguageContext';

export function StrategyPage() {
  const { navigateTo } = useRouter();
  const { t } = useLanguage();

  const services = [
    {
      icon: TrendingUp,
      title: t('strategy.feature.digital'),
      description: t('strategy.service.digital_desc')
    },
    {
      icon: Target,
      title: t('services.strategy.feature2'),
      description: t('strategy.service.analysis_desc')
    },
    {
      icon: BarChart3,
      title: t('services.strategy.feature3'),
      description: t('strategy.service.roi_desc')
    },
    {
      icon: Users,
      title: t('strategy.feature.consulting'),
      description: t('strategy.service.consulting_desc')
    }
  ];

  const packages = [
    {
      name: t('strategy.package.starter.name'),
      price: '600 €',
      features: [
        t('strategy.package.starter.feature1'),
        t('strategy.package.starter.feature2'),
        t('strategy.package.starter.feature3'),
        t('strategy.package.starter.feature4'),
        t('strategy.package.starter.feature5')
      ]
    },
    {
      name: t('strategy.package.professional.name'),
      price: '1.100 €',
      features: [
        t('strategy.package.professional.feature1'),
        t('strategy.package.professional.feature2'),
        t('strategy.package.professional.feature3'),
        t('strategy.package.professional.feature4'),
        t('strategy.package.professional.feature5')
      ],
      popular: true
    },
    {
      name: t('strategy.package.enterprise.name'),
      price: '2.000 €+',
      features: [
        t('strategy.package.enterprise.feature1'),
        t('strategy.package.enterprise.feature2'),
        t('strategy.package.enterprise.feature3'),
        t('strategy.package.enterprise.feature4'),
        t('strategy.package.enterprise.feature5')
      ]
    }
  ];

  const handlePackageSelect = (packageName: string) => {
    navigateTo('service-inquiry', {
      service: 'strategy',
      package: packageName
    });
  };

  const handleConsultation = () => {
    navigateTo('service-inquiry', {
      service: 'strategy'
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
                {t('strategy.badge')}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-bdigital-cyan">{t('strategy.hero.emphasis')}</span>{' '}{t('strategy.hero.trailing')}
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {t('strategy.hero.desc')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
                  onClick={handleConsultation}
                >
                  {t('strategy.hero.cta')}
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
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop"
                  alt="Strategy"
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
              {t('strategy.services.heading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* Pricing Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-bdigital-navy mb-4">
                {t('strategy.pricing.heading')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${pkg.popular ? 'ring-2 ring-bdigital-cyan' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-bdigital-cyan text-bdigital-navy px-4 py-1">
                        {t('packages.most_popular')}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-bdigital-navy mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-bdigital-cyan">{pkg.price}</div>
                    </div>
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

        {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bdigital-navy to-bdigital-dark-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('strategy.cta.title')}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t('strategy.cta.desc')}
          </p>
          <Button
            size="lg"
            className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
            onClick={handleConsultation}
          >
            {t('strategy.cta.primary')}
          </Button>
        </div>
      </section>
    </div>
  );
}