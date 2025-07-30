import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Instagram,
  Facebook,
  TrendingUp,
  Camera,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useRouter } from '../Router';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function SocialMediaPage() {
  const { navigateTo } = useRouter();

  const services = [
    {
      icon: Instagram,
      title: 'Instagram Management',
      description: 'Kreiranje sadržaja, stories, reels i interakcija sa vašom publikom'
    },
    {
      icon: Facebook,
      title: 'Facebook Marketing',
      description: 'Facebook stranice, grupe, Facebook Ads i community management'
    },
    {
      icon: Camera,
      title: 'Content Creation',
      description: 'Profesionalne fotografije, video sadržaj i grafički dizajn'
    },
    {
      icon: TrendingUp,
      title: 'Social Media Ads',
      description: 'Plaćene reklame na svim društvenim mrežama sa ciljanim publikom'
    }
  ];

  const packages = [
    {
      name: 'Starter Social',
      price: '€800/mes',
      features: [
        '10 postova mesečno',
        'Instagram + Facebook',
        'Basic content creation',
        'Mesečni izveštaj'
      ]
    },
    {
      name: 'Professional Social',
      price: '€1,200/mes',
      features: [
        '20 postova mesečno',
        'Sve društvene mreže',
        'Professional photography',
        'Video content',
        'Paid ads management'
      ],
      popular: true
    },
    {
      name: 'Enterprise Social',
      price: '€2,000/mes',
      features: [
        'Unlimited posts',
        'Dedicated social manager',
        'Influencer collaborations',
        'Advanced analytics'
      ]
    }
  ];

  const handlePackageSelect = (_packageName: string) => {
    navigateTo('home');
    setTimeout(() => {
      const element = document.querySelector('#contact');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
                Social Media Management
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-bdigital-cyan">Izgradite zajednicu</span> oko vašeg brenda
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Kreirajte angažovan sadržaj i povećajte broj pratilaca na svim društvenim mrežama uz našu stručnu pomoć.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
                  onClick={handleConsultation}
                >
                  Počnite danas
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
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=400&fit=crop"
                  alt="Social Media"
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
              Naše social media usluge
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
              Social Media paketi
            </h2>
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
                    Odaberi paket
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
            Spremni za jače prisustvo na društvenim mrežama?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Kontaktirajte nas i saznajte kako možemo povećati vaše pratioce i angažman.
          </p>
          <Button 
            size="lg"
            className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light px-8 py-3 font-semibold"
            onClick={handleConsultation}
          >
            Početak saradnje
          </Button>
        </div>
      </section>
    </div>
  );
}