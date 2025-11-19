import { useNavigate } from 'react-router-dom';
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
import { useActiveLocale } from '../hooks/useActiveLocale';
import { buildLocalizedPath, type PageType } from '../routing';

export function ServicesSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();

  const services = [
    {
      id: 'web-design',
      icon: Monitor,
      title: t('services.web.title'),
      description: t('services.web.desc'),
      features: [
        t('services.web.feature1'),
        t('services.web.feature2'),
        t('services.web.feature3'),
        t('services.web.feature4')
      ],
      color: 'from-blue-500 to-cyan-500',
      stats: { value: '50+', label: 'Web stranica' }
    },
    {
      id: 'seo',
      icon: Search,
      title: t('services.seo.title'),
      description: t('services.seo.desc'),
      features: [
        t('services.seo.feature1'),
        t('services.seo.feature2'),
        t('services.seo.feature3'),
        t('services.seo.feature4')
      ],
      color: 'from-green-500 to-emerald-500',
      stats: { value: '300%', label: 'Avg. povećanje' }
    },
    {
      id: 'social-media',
      icon: Share2,
      title: t('services.social.title'),
      description: t('services.social.desc'),
      features: [
        t('services.social.feature1'),
        t('services.social.feature2'),
        t('services.social.feature3'),
        t('services.social.feature4')
      ],
      color: 'from-purple-500 to-pink-500',
      stats: { value: '10K+', label: 'Followers gained' }
    },
    {
      id: 'branding',
      icon: Palette,
      title: t('services.branding.title'),
      description: t('services.branding.desc'),
      features: [
        t('services.branding.feature1'),
        t('services.branding.feature2'),
        t('services.branding.feature3'),
        t('services.branding.feature4')
      ],
      color: 'from-orange-500 to-red-500',
      stats: { value: '100+', label: 'Brand identiteta' }
    },
    {
      id: 'strategy',
      icon: Target,
      title: t('services.strategy.title'),
      description: t('services.strategy.desc'),
      features: [
        t('services.strategy.feature1'),
        t('services.strategy.feature2'),
        t('services.strategy.feature3'),
        t('services.strategy.feature4')
      ],
      color: 'from-indigo-500 to-purple-500',
      stats: { value: '250%', label: 'ROI povećanje' }
    }
  ];

  const handleServiceClick = (serviceId: PageType) => {
    const path = buildLocalizedPath(activeLocale, serviceId, { includeLocalePrefix });
    navigate(path);
  };

  const handleViewAll = () => {
    const path = buildLocalizedPath(activeLocale, 'service-inquiry', { includeLocalePrefix });
    navigate(path);
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <Badge className="bg-bdigital-cyan/10 text-bdigital-cyan-dark border-bdigital-cyan-dark/20 mb-4 px-4 py-2">
            {t('services.title')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bdigital-navy mb-4 lg:mb-6">
            {t('services.heading.part1')}
            <br />
            <span className="text-bdigital-cyan-dark">{t('services.heading.emphasis')}</span>
          </h2>
          <p className="text-lg lg:text-xl text-neutral-gray max-w-3xl mx-auto leading-relaxed">
            {t('services.description')}
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
                onClick={() => handleServiceClick(service.id as PageType)}
              >
                <CardHeader className="pb-4">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Title and Stats */}
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl lg:text-2xl font-bold text-bdigital-navy group-hover:text-bdigital-cyan-dark transition-colors duration-300 flex-1">
                      {service.title}
                    </CardTitle>
                    <div className="text-right ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-lg font-bold text-bdigital-cyan-dark">{service.stats.value}</div>
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
                        <div className="w-1.5 h-1.5 bg-bdigital-cyan-dark rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-neutral-gray">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-bdigital-cyan-dark hover:text-bdigital-navy hover:bg-bdigital-cyan/10 font-semibold p-4 group-hover:bg-bdigital-cyan group-hover:text-bdigital-navy transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan-dark"
                  >
                    {t('services.learn_more')}
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
                {t('services.why.title.pre')}{' '}
                <span className="text-bdigital-cyan-dark">DIAL Digital</span>
                {t('services.why.title.post')}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 lg:mb-8">
                {t('services.why.desc')}
              </p>
              <Button
                onClick={handleViewAll}
                className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan"
              >
                {t('services.why.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
              {[
                { icon: Zap, title: t('services.why.fast.title'), desc: t('services.why.fast.desc') },
                { icon: TrendingUp, title: t('services.why.results.title'), desc: t('services.why.results.desc') },
                { icon: Users, title: t('services.why.support.title'), desc: t('services.why.support.desc') },
                { icon: Award, title: t('services.why.experience.title'), desc: t('services.why.experience.desc') }
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