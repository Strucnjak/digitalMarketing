import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function TestimonialsSection() {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = language === 'me' ? [
    {
      name: 'Marko Petrović',
      role: 'Vlasnik restorana "Konoba Stari Grad"',
      content: 'DIAL Digital je kreirao fantastičnu web stranicu za naš restoran. Broj online rezervacija se udvostručio u prva tri meseca!',
      avatar: 'MP',
      company: 'Konoba Stari Grad',
      rating: 5
    },
    {
      name: 'Ana Nikolić',
      role: 'Direktorka "Montenegrin Properties"',
      content: 'Njihov SEO je potpuno transformisao naše online prisustvo. Sada smo prvi u Google pretragama za nekretnine u Podgorici.',
      avatar: 'AN',
      company: 'Montenegrin Properties',
      rating: 5
    },
    {
      name: 'Stefan Jovanović',
      role: 'Osnivač "TechStart ME"',
      content: 'Profesionalni pristup, kreativna rešenja i odličan rezultat. Preporučujem DIAL Digital svim kompanijama koje žele rast.',
      avatar: 'SJ',
      company: 'TechStart ME',
      rating: 5
    }
  ] : [
    {
      name: 'Mark Petrovic',
      role: 'Owner of "Konoba Stari Grad" Restaurant',
      content: 'DIAL Digital created a fantastic website for our restaurant. Online reservations doubled in the first three months!',
      avatar: 'MP',
      company: 'Konoba Stari Grad',
      rating: 5
    },
    {
      name: 'Ana Nikolic',
      role: 'Director of "Montenegrin Properties"',
      content: 'Their SEO completely transformed our online presence. We\'re now first in Google searches for real estate in Podgorica.',
      avatar: 'AN',
      company: 'Montenegrin Properties',
      rating: 5
    },
    {
      name: 'Stefan Jovanovic',
      role: 'Founder of "TechStart ME"',
      content: 'Professional approach, creative solutions and excellent results. I recommend DIAL Digital to all companies that want growth.',
      avatar: 'SJ',
      company: 'TechStart ME',
      rating: 5
    }
  ];
  const totalSlides = testimonials.length;
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % totalSlides);

  return (
    <section className="bg-gray-50 py-20 dark:bg-bdigital-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold text-dark-gray md:text-4xl dark:text-slate-100">
            {t('testimonials.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-gray dark:text-slate-300">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2 md:px-6">
                  <Card className="border-0 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border dark:border-bdigital-dark-navy dark:bg-bdigital-night">
                    <CardContent className="p-6 md:p-8">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <Quote className="h-6 w-6 text-bdigital-cyan/60" />
                      </div>

                      <p className="mb-6 text-neutral-gray italic leading-relaxed dark:text-slate-300">
                        "{testimonial.content}"
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src="" alt={testimonial.name} />
                            <AvatarFallback className="bg-digital-blue text-white">
                              {testimonial.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-dark-gray dark:text-slate-100">{testimonial.name}</h4>
                            <p className="text-sm text-neutral-gray dark:text-slate-400">{testimonial.role}</p>
                          </div>
                        </div>
                        <span className="rounded-full border border-bdigital-cyan/20 bg-bdigital-cyan/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-bdigital-cyan-dark dark:border-bdigital-cyan/40 dark:text-bdigital-cyan">
                          {testimonial.company}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bdigital-cyan/40 text-bdigital-cyan-dark transition hover:bg-bdigital-cyan hover:text-bdigital-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan dark:text-bdigital-cyan"
              aria-label={t('testimonials.prev') ?? 'Previous testimonial'}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label={t('testimonials.carousel') ?? 'Testimonials'}>
              {testimonials.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-bdigital-cyan-dark dark:bg-bdigital-cyan' : 'bg-gray-300 dark:bg-slate-600'
                    }`}
                    aria-label={`${t('testimonials.slide') ?? 'Testimonial'} ${index + 1}`}
                    aria-selected={isActive}
                    role="tab"
                  />
                );
              })}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bdigital-cyan/40 text-bdigital-cyan-dark transition hover:bg-bdigital-cyan hover:text-bdigital-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bdigital-cyan dark:text-bdigital-cyan"
              aria-label={t('testimonials.next') ?? 'Next testimonial'}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mb-2 text-2xl font-bold text-digital-blue dark:text-bdigital-cyan">100%</div>
              <div className="text-sm text-neutral-gray dark:text-slate-400">{t('testimonials.stats.clients')}</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-2xl font-bold text-digital-blue dark:text-bdigital-cyan">24h</div>
              <div className="text-sm text-neutral-gray dark:text-slate-400">{t('testimonials.stats.response')}</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-2xl font-bold text-digital-blue dark:text-bdigital-cyan">3+</div>
              <div className="text-sm text-neutral-gray dark:text-slate-400">{t('testimonials.stats.years')}</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-2xl font-bold text-digital-blue dark:text-bdigital-cyan">50+</div>
              <div className="text-sm text-neutral-gray dark:text-slate-400">{t('testimonials.stats.projects')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
