import { Quote } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function TestimonialsSection() {
  const { t, language } = useLanguage();
  const testimonials =
    language === "me"
      ? [
          {
            name: "Marko Petrović",
            role: 'Vlasnik restorana "Konoba Stari Grad"',
            content:
              "DIAL Digital je kreirao fantastičnu web stranicu za naš restoran. Broj online rezervacija se udvostručio u prva tri meseca!",
          },
          {
            name: "Ana Nikolić",
            role: 'Direktorka "Montenegrin Properties"',
            content:
              "Njihov SEO je potpuno transformisao naše online prisustvo. Sada smo prvi u Google pretragama za nekretnine u Podgorici.",
          },
          {
            name: "Stefan Jovanović",
            role: 'Osnivač "TechStart ME"',
            content:
              "Profesionalni pristup, kreativna rešenja i odličan rezultat. Preporučujem DIAL Digital svim kompanijama koje žele rast.",
          },
        ]
      : [
          {
            name: "Mark Petrovic",
            role: 'Owner of "Konoba Stari Grad" Restaurant',
            content:
              "DIAL Digital created a fantastic website for our restaurant. Online reservations doubled in the first three months!",
          },
          {
            name: "Ana Nikolic",
            role: 'Director of "Montenegrin Properties"',
            content:
              "Their SEO completely transformed our online presence. We're now first in Google searches for real estate in Podgorica.",
          },
          {
            name: "Stefan Jovanovic",
            role: 'Founder of "TechStart ME"',
            content:
              "Professional approach, creative solutions and excellent results. I recommend DIAL Digital to all companies that want growth.",
          },
        ];

  return (
    <section
      id="testimonials"
      className="section-shell bg-slate-50 dark:bg-bdigital-midnight"
    >
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">{t("testimonials.title")}</p>
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t("testimonials.subtitle")}
            </p>
          </div>
          <figure className="lg:col-span-8 lg:col-start-5">
            <Quote
              className="h-8 w-8 text-bdigital-cyan-dark dark:text-bdigital-cyan"
              aria-hidden="true"
            />
            <blockquote className="mt-8 text-3xl font-medium leading-tight tracking-[-0.035em] text-bdigital-navy sm:text-4xl lg:text-5xl dark:text-white">
              “{testimonials[0].content}”
            </blockquote>
            <figcaption className="mt-8 border-t border-slate-300 pt-5 dark:border-slate-700">
              <p className="font-semibold text-bdigital-navy dark:text-white">
                {testimonials[0].name}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {testimonials[0].role}
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="mt-20 grid gap-10 border-t border-slate-300 pt-10 dark:border-slate-700 md:grid-cols-2 lg:ml-[33.333%]">
          {testimonials.slice(1).map((testimonial) => (
            <figure key={testimonial.name}>
              <blockquote className="text-lg leading-8 text-bdigital-navy dark:text-slate-200">
                “{testimonial.content}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold text-bdigital-navy dark:text-white">
                  {testimonial.name}
                </span>
                <span className="mt-1 block text-slate-500 dark:text-slate-400">
                  {testimonial.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
