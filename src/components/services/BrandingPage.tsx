import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Palette, 
  FileImage, 
  Type, 
  Package,
  ArrowRight
} from 'lucide-react';
import { useRouter } from '../Router';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function BrandingPage() {
  const { navigateTo } = useRouter();

  const services = [
    {
      icon: Palette,
      title: 'Logo dizajn',
      description: 'Jedinstveni logo koji predstavlja suštinu vašeg brenda'
    },
    {
      icon: FileImage,
      title: 'Brand identitet',
      description: 'Kompletna vizuelna identifikacija uključujući boje, fontove i stil'
    },
    {
      icon: Type,
      title: 'Print materijali',
      description: 'Vizit karte, brošure, plakati i ostali print materijali'
    },
    {
      icon: Package,
      title: 'Brand guidelines',
      description: 'Detaljno uputstvo za korišćenje brenda u svim situacijama'
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
                Branding & Graphic Design
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-bdigital-cyan">Kreirajte nezaboravan</span> brand identitet
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Od ideje do kompletnog vizuelnog identiteta - pomažemo vam da se istaknete na tržištu.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
                  onClick={handleConsultation}
                >
                  Početak projekta
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
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=400&fit=crop"
                  alt="Branding"
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
              Branding usluge
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
            Spremni za novi brand identitet?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Kontaktirajte nas i kreirajmo zajedno brand koji će vas izdvojiti od konkurencije.
          </p>
          <Button 
            size="lg"
            className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
            onClick={handleConsultation}
          >
            Konsultacija
          </Button>
        </div>
      </section>
    </div>
  );
}