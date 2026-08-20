import { useLanguage } from "./LanguageContext";

const testimonialIds = ["marko", "ana", "stefan"] as const;

export function TestimonialsSection() {
  const { t } = useLanguage();
  const testimonials = testimonialIds.map((id) => ({
    id,
    name: t(`testimonials.items.${id}.name`),
    role: t(`testimonials.items.${id}.role`),
    quote: t(`testimonials.items.${id}.quote`),
  }));

  return (
    <section
      id="testimonials"
      className="section-shell bg-surface-subtle dark:bg-background"
    >
      <div className="site-container">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow">{t("testimonials.title")}</p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-text-muted dark:text-text-muted">
            {t("testimonials.subtitle")}
          </p>
          <figure className="mt-12">
            <blockquote className="text-3xl font-medium leading-tight tracking-[-0.04em] text-text-primary sm:text-5xl lg:text-6xl dark:text-white">
              “{testimonials[0].quote}”
            </blockquote>
            <figcaption className="mt-9 text-sm">
              <span className="font-semibold text-text-primary dark:text-white">
                {testimonials[0].name}
              </span>
              <span className="mt-1 block text-text-muted dark:text-text-muted">
                {testimonials[0].role}
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-24 grid gap-12 border-t border-border-default pt-10 dark:border-border-default md:grid-cols-2 lg:ml-auto lg:max-w-5xl">
          {testimonials.slice(1).map((testimonial) => (
            <figure key={testimonial.id}>
              <blockquote className="text-lg leading-8 text-text-primary dark:text-slate-200">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold text-text-primary dark:text-white">
                  {testimonial.name}
                </span>
                <span className="mt-1 block text-text-muted dark:text-text-muted">
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
