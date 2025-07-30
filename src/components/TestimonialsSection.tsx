import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function TestimonialsSection() {
  const { t, language } = useLanguage();

  const testimonials = language === 'sr' ? [
    {
      name: 'Marko Petrović',
      role: 'Vlasnik restorana "Konoba Stari Grad"',
      content: 'BDigital je kreirao fantastičnu web stranicu za naš restoran. Broj online rezervacija se udvostručio u prva tri meseca!',
      avatar: 'MP',
      rating: 5
    },
    {
      name: 'Ana Nikolić',
      role: 'Direktorka "Montenegrin Properties"',
      content: 'Njihov SEO je potpuno transformisao naše online prisustvo. Sada smo prvi u Google pretragama za nekretnine u Podgorici.',
      avatar: 'AN',
      rating: 5
    },
    {
      name: 'Stefan Jovanović',
      role: 'Osnivač "TechStart ME"',
      content: 'Profesionalni pristup, kreativna rešenja i odličan rezultat. Preporučujem BDigital svim kompanijama koje žele rast.',
      avatar: 'SJ',
      rating: 5
    }
  ] : [
    {
      name: 'Mark Petrovic',
      role: 'Owner of "Konoba Stari Grad" Restaurant',
      content: 'BDigital created a fantastic website for our restaurant. Online reservations doubled in the first three months!',
      avatar: 'MP',
      rating: 5
    },
    {
      name: 'Ana Nikolic',
      role: 'Director of "Montenegrin Properties"',
      content: 'Their SEO completely transformed our online presence. We\'re now first in Google searches for real estate in Podgorica.',
      avatar: 'AN',
      rating: 5
    },
    {
      name: 'Stefan Jovanovic',
      role: 'Founder of "TechStart ME"',
      content: 'Professional approach, creative solutions and excellent results. I recommend BDigital to all companies that want growth.',
      avatar: 'SJ',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <p className="text-neutral-gray mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Client Info */}
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="" alt={testimonial.name} />
                    <AvatarFallback className="bg-digital-blue text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-dark-gray">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-gray">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-digital-blue mb-2">100%</div>
              <div className="text-sm text-neutral-gray">Zadovoljnih klijenata</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-digital-blue mb-2">24h</div>
              <div className="text-sm text-neutral-gray">Vreme odgovora</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-digital-blue mb-2">3+</div>
              <div className="text-sm text-neutral-gray">Godine iskustva</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-digital-blue mb-2">50+</div>
              <div className="text-sm text-neutral-gray">Završenih projekata</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}