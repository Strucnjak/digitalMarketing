import { useLanguage } from "./LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutSection() {
  const { t } = useLanguage();
  const principles = [
    { title: t("about.mission.title"), description: t("about.mission.desc") },
    { title: t("about.vision.title"), description: t("about.vision.desc") },
    { title: t("about.values.title"), description: t("about.values.desc") },
  ];
  const team = [
    {
      name: "Marko Petrović",
      role: "CEO & Creative Director",
      description:
        "Vodi kreativni tim sa više od 5 godina iskustva u digitalnom marketingu.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=640&h=800&fit=crop&q=85",
    },
    {
      name: "Ana Nikolić",
      role: "Lead Developer",
      description:
        "Ekspert za web tehnologije i UX/UI dizajn sa strašću za inovacije.",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=640&h=800&fit=crop&q=85",
    },
    {
      name: "Stefan Jovanović",
      role: "SEO Specialist",
      description: "Specijalizovan za SEO optimizaciju i digitalne strategije.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=640&h=800&fit=crop&q=85",
    },
  ];

  return (
    <section id="about" className="section-shell bg-bdigital-navy text-white">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow !text-slate-400">{t("about.title")}</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="section-title max-w-4xl text-white">
              {t("about.subtitle")}
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
              {t("about.description")}
            </p>
          </div>
        </div>

        <div className="mt-20 grid border-y border-white/20 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className="border-b border-white/20 py-9 last:border-b-0 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
            >
              <p className="font-mono text-xs text-slate-500">0{index + 1}</p>
              <h3 className="mt-6 text-xl font-semibold text-white">
                {principle.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {principle.description}
              </p>
            </div>
          ))}
        </ol>

        <div className="mt-28 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="eyebrow !text-slate-400">{t("about.team.title")}</p>
            <h3 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              {t("about.team.subtitle")}
            </h3>
          </div>
          <p className="text-sm leading-6 text-slate-400 lg:col-span-4 lg:col-start-9">
            {t("about.description")}
          </p>
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6 !text-slate-400">
              {t("about.team.title")}
            </p>
            <h3 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              {t("about.team.subtitle")}
            </h3>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name}>
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-bdigital-dark-navy">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover grayscale"
                  loading="lazy"
                />
              </div>
              <h4 className="mt-5 text-xl font-semibold text-white">
                {member.name}
              </h4>
              <p className="mt-1 text-sm font-medium text-bdigital-cyan">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {member.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
