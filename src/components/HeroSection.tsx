import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, CheckCircle, Star, Users, Award } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useRouter } from './Router';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  const { t: _t } = useLanguage();
  const { navigateTo } = useRouter();

  const stats = [
    { icon: Users, value: '100+', label: _t('hero.stats.clients') },
    { icon: Award, value: '200+', label: _t('hero.stats.projects') },
    { icon: Star, value: '4.9', label: _t('hero.stats.rating') },
    { icon: CheckCircle, value: '24h', label: _t('hero.stats.response') }
  ];

  const handleGetStarted = () => {
    navigateTo('service-inquiry');
  };

  const handleViewPortfolio = () => {
    const element = document.querySelector('#portfolio');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-bdigital-navy via-bdigital-dark-navy to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-bdigital-navy/90 via-bdigital-dark-navy/90 to-black/90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,212,255,0.05),transparent_50%)]"></div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-bdigital-cyan/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div className="text-white space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <Badge className="bg-bdigital-cyan/20 text-bdigital-cyan border-bdigital-cyan/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                {_t('hero.badge')}
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {_t('hero.title')}
              </h1>
              <div className="w-20 h-1 bg-bdigital-cyan mx-auto lg:mx-0 rounded-full"></div>
            </div>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {_t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold px-8 py-4 text-base shadow-2xl hover:shadow-bdigital-cyan/25 transition-all duration-300 transform hover:scale-105 group"
              >
                {_t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleViewPortfolio}
                className="border-2 border-bdigital-cyan text-bdigital-cyan hover:bg-bdigital-cyan hover:text-bdigital-navy font-semibold px-8 py-4 text-base backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                {_t('hero.secondary')}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 lg:pt-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center lg:text-left group">
                      <div className="flex items-center justify-center lg:justify-start mb-2">
                        <IconComponent className="h-5 w-5 text-bdigital-cyan mr-2 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-bdigital-cyan group-hover:scale-110 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative order-first lg:order-last">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-bdigital-cyan rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Star className="h-4 w-4 text-bdigital-navy" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-bdigital-cyan to-bdigital-cyan-light rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <CheckCircle className="h-6 w-6 text-bdigital-navy" />
                </div>

                {/* Main Hero Image */}
                <div className="relative overflow-hidden rounded-xl lg:rounded-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80"
                    alt={_t('hero.image_alt')}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay Stats */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bdigital-navy/20 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-bdigital-navy">Conversion Rate</div>
                            <div className="text-2xl font-bold text-bdigital-cyan">+287%</div>
                          </div>
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <div className="text-green-600 text-xs">↗</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -top-8 -right-8 w-32 h-32 bg-bdigital-cyan/10 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 -bottom-8 -left-8 w-24 h-24 bg-bdigital-cyan/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-bdigital-cyan rounded-full flex justify-center">
            <div className="w-1 h-3 bg-bdigital-cyan rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}