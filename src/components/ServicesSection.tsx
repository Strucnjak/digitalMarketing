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
      color: 'bg-bdigital-cyan/10 text-bdigital-cyan-dark',
      iconTone: 'text-bdigital-cyan-dark',
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
      color: 'bg-bdigital-cyan/10 text-bdigital-cyan-dark',
      iconTone: 'text-bdigital-cyan-dark',
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
      color: 'bg-bdigital-cyan/10 text-bdigital-cyan-dark',
      iconTone: 'text-bdigital-cyan-dark',
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
      color: 'bg-bdigital-cyan/10 text-bdigital-cyan-dark',
      iconTone: 'text-bdigital-cyan-dark',
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
      color: 'bg-bdigital-cyan/10 text-bdigital-cyan-dark',
      iconTone: 'text-bdigital-cyan-dark',
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
    <section id="services" className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24 dark:from-bdigital-midnight dark:to-bdigital-dark-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <Badge className="bg-bdigital-cyan/10 text-bdigital-cyan-dark border-bdigital-cyan-dark/20 mb-4 px-4 py-2">
            {t('services.title')}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-bdigital-navy sm:text-4xl lg:mb-6 lg:text-5xl dark:text-slate-100">
            {t('services.heading.part1')}
            <br />
            <span className="text-bdigital-cyan-dark dark:text-bdigital-cyan">{t('services.heading.emphasis')}</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-neutral-gray leading-relaxed lg:text-xl dark:text-slate-300">
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
                className="group cursor-pointer overflow-hidden border border-transparent bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-bdigital-dark-navy/60 dark:bg-bdigital-night"
                onClick={() => handleServiceClick(service.id as PageType)}
              >
                <CardHeader className="pb-4">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className={`h-8 w-8 ${service.iconTone}`} />
                  </div>
                  
                  {/* Title and Stats */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <CardTitle className="flex-1 text-xl font-bold text-bdigital-navy transition-colors duration-300 group-hover:text-bdigital-cyan-dark lg:text-2xl dark:text-slate-100 dark:group-hover:text-bdigital-cyan">
                      {service.title}
                    </CardTitle>
                    <div className="text-left sm:text-right sm:ml-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-lg font-bold text-bdigital-cyan-dark dark:text-bdigital-cyan">{service.stats.value}</div>
                      <div className="text-xs text-neutral-gray dark:text-slate-400">{service.stats.label}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="mb-4 text-neutral-gray leading-relaxed lg:mb-6 dark:text-slate-300">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="mb-6 space-y-2 text-sm text-neutral-gray dark:text-slate-300">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-bdigital-cyan-dark" aria-hidden="true"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 font-semibold text-bdigital-cyan-dark transition-all duration-300 hover:bg-bdigital-cyan/10 hover:text-bdigital-navy group-hover:bg-bdigital-cyan group-hover:text-bdigital-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan-dark dark:text-bdigital-cyan dark:hover:bg-bdigital-cyan dark:hover:text-slate-900 dark:group-hover:bg-bdigital-cyan dark:group-hover:text-slate-900"
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
        <div className="bg-gradient-to-r from-bdigital-navy to-bdigital-dark-navy rounded-3xl p-6 sm:p-8 lg:p-12 text-white">
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
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
