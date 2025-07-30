import React from 'react';
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

export function StrategyPage() {
  const { navigateTo } = useRouter();

  const services = [
    {
      icon: TrendingUp,
      title: 'Digitalna strategija',
      description: 'Kompletna digitalna strategija usmerena na vaše poslovne ciljeve'
    },
    {
      icon: Target,
      title: 'Konkurentska analiza',
      description: 'Detaljna analiza konkurencije i mogućnosti na tržištu'
    },
    {
      icon: BarChart3,
      title: 'ROI optimizacija',
      description: 'Maksimiziranje povrata na investiciju u digitalni marketing'
    },
    {
      icon: Users,
      title: 'Konsultacije',
      description: 'Stručne konsultacije i podrška u implementaciji strategije'
    }
  ];

  const handleConsultation = () => {
    navigateTo('home');
    setTimeout(() => {
      const element = document.querySelector('#contact');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-bdigital-navy via-bdigital-dark-navy to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-bdigital-cyan/20 text-bdigital-cyan border-bdigital-cyan mb-4">
                Strategy & Consulting
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-bdigital-cyan">Strategije</span> za digitalni uspeh
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Kreirajmo zajedno digitalnu strategiju koja će dovesti vaš biznis do novih visina.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
                  onClick={handleConsultation}
                >
                  Konsultacija
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
              Konsalting usluge
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bdigital-navy to-bdigital-dark-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Spremni za digitalnu transformaciju?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Zakažite besplatnu konsultaciju i saznajte kako možemo pomoći vašem biznisu.
          </p>
          <Button 
            size="lg"
            className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
            onClick={handleConsultation}
          >
            Zakažite konsultaciju
          </Button>
        </div>
      </section>
    </div>
  );
}