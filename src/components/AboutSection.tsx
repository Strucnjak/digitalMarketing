import { useLanguage } from "./LanguageContext";

const teamMembers = [
  { id: "marko", name: "Marko Petrović", initials: "MP" },
  { id: "ana", name: "Ana Nikolić", initials: "AN" },
  { id: "stefan", name: "Stefan Jovanović", initials: "SJ" },
];

function TeamPortraitPlaceholder({
  name,
  initials,
  label,
}: {
  name: string;
  initials: string;
  label: string;
}) {
  return (
    <div
      className="flex aspect-[4/3] items-center justify-center bg-bdigital-dark-navy"
      role="img"
      aria-label={`${name}. ${label}`}
    >
      <span
        className="text-5xl font-light tracking-[-0.06em] text-slate-600"
        aria-hidden="true"
      >
        {initials}
      </span>
    </div>
  );
}

export function AboutSection() {
  const { t } = useLanguage();
  const approach = [
    t("about.approach.items.1"),
    t("about.approach.items.2"),
    t("about.approach.items.3"),
  ];

  return (
    <section
      id="about"
      className="section-shell overflow-hidden bg-bdigital-navy text-white"
    >
      <div className="site-container">
        <div className="max-w-5xl">
          <p className="eyebrow !text-slate-400">
            {t("about.approach.eyebrow")}
          </p>
          <h2 className="mt-8 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            {t("about.approach.title")}
          </h2>
          <p className="mt-10 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            {t("about.approach.body")}
          </p>
        </div>

        <ol className="mt-20 grid border-y border-white/15 md:grid-cols-3">
          {approach.map((item) => (
            <li
              key={item}
              className="border-b border-white/15 py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <p className="max-w-sm text-base leading-7 text-slate-200">
                {item}
              </p>
            </li>
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

        <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {teamMembers.map((member) => (
            <article key={member.id} className="border-t border-white/20 pt-6">
              <TeamPortraitPlaceholder
                name={member.name}
                initials={member.initials}
                label={t("about.team.image_placeholder")}
              />
              <h4 className="mt-5 text-xl font-semibold text-white">
                {member.name}
              </h4>
              <p className="mt-1 text-sm font-medium text-slate-400">
                {t(`about.team.${member.id}.role`)}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {t(`about.team.${member.id}.description`)}
              </p>
              <p className="mt-4 text-xs italic text-slate-500">
                {t("about.team.image_placeholder")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
