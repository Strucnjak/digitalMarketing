import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  Database,
  Filter,
  Layers3,
  Route,
  Target,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useActiveLocale } from "../../hooks/useActiveLocale";
import { buildLocalizedPath, type PageType } from "../../routing";

const capabilityKeys = ["ga4", "gtm", "conversion", "source", "crm", "quality", "reporting"] as const;
const capabilityIcons = [Activity, Layers3, Target, Route, Database, Filter, BarChart3];
const flowKeys = ["campaign", "visit", "conversion", "source", "crm", "quality", "optimisation"] as const;
const outcomeKeys = ["source", "quality", "optimisation", "reporting"] as const;
const processKeys = ["audit", "define", "implement", "validate"] as const;
const relatedPages: PageType[] = ["strategy", "web-design", "seo", "social-media"];

export function AnalyticsTrackingCrmPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const path = (page: PageType) => buildLocalizedPath(activeLocale, page, { includeLocalePrefix });
  const book = () => navigate(path("free-consultation"));

  return (
    <main className="min-h-screen bg-surface dark:bg-background">
      <section className="bg-bdigital-navy pb-20 pt-28 text-white lg:pb-28 lg:pt-36">
        <div className="site-container">
          <button type="button" onClick={() => navigate(path("home"))} className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />{t("general.back_home")}
          </button>
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow !text-slate-300">{t("analyticsCrm.badge")}</p>
              <h1 className="display-title mt-7 text-white">{t("analyticsCrm.hero.title")}</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-lg leading-8 text-slate-300">{t("analyticsCrm.hero.description")}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button type="button" onClick={book} className="focus-ring inline-flex min-h-12 items-center rounded-md bg-accent px-6 font-semibold text-text-primary">
                  {t("analyticsCrm.hero.primary")}<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </button>
                <a href="#measurement-flow" className="focus-ring inline-flex min-h-12 items-center border-b border-slate-500 px-1 font-semibold text-white">{t("analyticsCrm.hero.secondary")}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface dark:bg-background">
        <div className="site-container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5"><p className="eyebrow">{t("analyticsCrm.intro.eyebrow")}</p><h2 className="section-title mt-7 text-text-primary dark:text-white">{t("analyticsCrm.intro.title")}</h2></div>
          <div className="space-y-5 text-lg leading-8 text-text-secondary dark:text-text-secondary lg:col-span-6 lg:col-start-7"><p>{t("analyticsCrm.intro.body1")}</p><p>{t("analyticsCrm.intro.body2")}</p></div>
        </div>
      </section>

      <section className="section-shell bg-surface-subtle dark:bg-surface" aria-labelledby="capabilities-title">
        <div className="site-container">
          <div className="grid gap-8 border-b border-border-default pb-12 lg:grid-cols-12"><div className="lg:col-span-7"><p className="eyebrow">{t("analyticsCrm.capabilities.eyebrow")}</p><h2 id="capabilities-title" className="section-title mt-7 text-text-primary dark:text-white">{t("analyticsCrm.capabilities.title")}</h2></div><p className="lead-copy lg:col-span-4 lg:col-start-9 lg:self-end">{t("analyticsCrm.capabilities.description")}</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {capabilityKeys.map((key, index) => { const Icon = capabilityIcons[index]; return <article key={key} className="border-b border-border-default py-9 md:px-8 md:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"><Icon className="h-5 w-5 text-text-muted" aria-hidden="true"/><h3 className="mt-7 text-xl font-semibold text-text-primary dark:text-white">{t(`analyticsCrm.capability.${key}.title`)}</h3><p className="mt-3 leading-7 text-text-secondary dark:text-text-secondary">{t(`analyticsCrm.capability.${key}.description`)}</p></article>; })}
          </div>
        </div>
      </section>

      <section id="measurement-flow" className="section-shell scroll-mt-20 bg-bdigital-dark-navy text-white" aria-labelledby="flow-title">
        <div className="site-container"><p className="eyebrow !text-slate-400">{t("analyticsCrm.flow.eyebrow")}</p><h2 id="flow-title" className="section-title mt-7 text-white">{t("analyticsCrm.flow.title")}</h2>
          <ol className="mt-14 grid border-y border-white/10 md:grid-cols-2 lg:grid-cols-7">
            {flowKeys.map((key,index)=><li key={key} className={`relative border-b border-white/10 p-6 last:border-b-0 md:border-r lg:border-b-0 ${index===6 ? "bg-white/[0.06]" : ""}`}><span className="text-xs font-semibold text-slate-400">{String(index+1).padStart(2,"0")}</span><h3 className="mt-5 font-semibold text-white">{t(`analyticsCrm.flow.${key}.title`)}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{t(`analyticsCrm.flow.${key}.description`)}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="section-shell bg-surface dark:bg-background"><div className="site-container"><p className="eyebrow">{t("analyticsCrm.outcomes.eyebrow")}</p><h2 className="section-title mt-7 max-w-4xl text-text-primary dark:text-white">{t("analyticsCrm.outcomes.title")}</h2><div className="mt-14 grid border-t border-border-default md:grid-cols-2">{outcomeKeys.map((key,index)=><article key={key} className="border-b border-border-default py-8 md:px-8"><span className="text-sm text-text-muted">0{index+1}</span><h3 className="mt-5 text-xl font-semibold text-text-primary dark:text-white">{t(`analyticsCrm.outcome.${key}.title`)}</h3><p className="mt-3 leading-7 text-text-secondary dark:text-text-secondary">{t(`analyticsCrm.outcome.${key}.description`)}</p></article>)}</div></div></section>

      <section className="section-shell bg-surface-subtle dark:bg-surface"><div className="site-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><p className="eyebrow">{t("analyticsCrm.problems.eyebrow")}</p><h2 className="section-title mt-7 text-text-primary dark:text-white">{t("analyticsCrm.problems.title")}</h2></div><ul className="border-t border-border-default lg:col-span-6 lg:col-start-7">{Array.from({length:8},(_,i)=><li key={i} className="flex gap-4 border-b border-border-default py-4 text-text-secondary dark:text-text-secondary"><Check className="mt-1 h-4 w-4 shrink-0 text-text-muted" aria-hidden="true"/>{t(`analyticsCrm.problems.item${i+1}`)}</li>)}</ul></div></section>

      <section className="section-shell bg-surface dark:bg-background"><div className="site-container"><h2 className="section-title max-w-3xl text-text-primary dark:text-white">{t("analyticsCrm.tools.title")}</h2><ul className="mt-12 flex flex-wrap border-y border-border-default py-4">{Array.from({length:9},(_,i)=><li key={i} className="border-r border-border-default px-5 py-3 text-sm font-semibold text-text-secondary last:border-r-0 dark:text-text-secondary">{t(`analyticsCrm.tools.item${i+1}`)}</li>)}</ul></div></section>

      <section className="section-shell bg-surface-subtle dark:bg-surface"><div className="site-container grid gap-12 lg:grid-cols-2"><div><p className="eyebrow">{t("analyticsCrm.crm.eyebrow")}</p><h2 className="section-title mt-7 text-text-primary dark:text-white">{t("analyticsCrm.crm.title")}</h2></div><div><p className="text-lg leading-8 text-text-secondary dark:text-text-secondary">{t("analyticsCrm.crm.body1")}</p><p className="mt-5 text-lg leading-8 text-text-secondary dark:text-text-secondary">{t("analyticsCrm.crm.body2")}</p><div className="mt-8 flex flex-wrap gap-2">{Array.from({length:6},(_,i)=><span key={i} className="rounded-md border border-border-default bg-surface px-3 py-2 text-sm text-text-secondary dark:bg-background dark:text-text-secondary">{t(`analyticsCrm.crm.item${i+1}`)}</span>)}</div></div></div></section>

      <section className="section-shell bg-surface dark:bg-background"><div className="site-container grid gap-10 lg:grid-cols-12"><h2 className="section-title text-text-primary dark:text-white lg:col-span-5">{t("analyticsCrm.attribution.title")}</h2><p className="text-lg leading-8 text-text-secondary dark:text-text-secondary lg:col-span-6 lg:col-start-7">{t("analyticsCrm.attribution.body")}</p></div></section>

      <section className="section-shell bg-surface-subtle dark:bg-surface"><div className="site-container grid gap-10 lg:grid-cols-12"><div className="lg:col-span-5"><p className="eyebrow">{t("analyticsCrm.reporting.eyebrow")}</p><h2 className="section-title mt-7 text-text-primary dark:text-white">{t("analyticsCrm.reporting.title")}</h2><p className="lead-copy mt-6">{t("analyticsCrm.reporting.body")}</p></div><ul className="grid grid-cols-2 gap-x-8 lg:col-span-6 lg:col-start-7">{Array.from({length:12},(_,i)=><li key={i} className="border-b border-border-default py-3 text-sm text-text-secondary dark:text-text-secondary">{t(`analyticsCrm.reporting.item${i+1}`)}</li>)}</ul></div></section>

      <section className="section-shell bg-surface dark:bg-background"><div className="site-container"><h2 className="section-title text-text-primary dark:text-white">{t("analyticsCrm.process.title")}</h2><div className="mt-14 border-t border-border-default">{processKeys.map((key,index)=><article key={key} className="grid gap-4 border-b border-border-default py-8 md:grid-cols-[5rem_1fr_2fr]"><span className="text-sm text-text-muted">0{index+1}</span><h3 className="text-xl font-semibold text-text-primary dark:text-white">{t(`analyticsCrm.process.${key}.title`)}</h3><p className="leading-7 text-text-secondary dark:text-text-secondary">{t(`analyticsCrm.process.${key}.description`)}</p></article>)}</div></div></section>

      <section className="section-shell bg-surface-subtle dark:bg-surface"><div className="site-container grid gap-10 lg:grid-cols-12"><div className="lg:col-span-5"><p className="eyebrow">{t("analyticsCrm.audience.eyebrow")}</p><h2 className="section-title mt-7 text-text-primary dark:text-white">{t("analyticsCrm.audience.title")}</h2></div><ul className="lg:col-span-6 lg:col-start-7">{Array.from({length:6},(_,i)=><li key={i} className="border-b border-border-default py-4 text-text-secondary dark:text-text-secondary">{t(`analyticsCrm.audience.item${i+1}`)}</li>)}</ul></div></section>

      <section className="border-t border-white/10 bg-bdigital-dark-navy py-20 text-white"><div className="site-container grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="eyebrow !text-slate-400">{t("analyticsCrm.cta.eyebrow")}</p><h2 className="section-title mt-7 text-white">{t("analyticsCrm.cta.title")}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{t("analyticsCrm.cta.body")}</p></div><div className="flex flex-col gap-4 lg:col-span-4 lg:items-end"><button type="button" onClick={book} className="focus-ring inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 font-semibold text-text-primary">{t("analyticsCrm.cta.primary")}<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true"/></button><Link to={`${path("home")}#contact`} className="focus-ring text-sm font-semibold text-slate-300 underline underline-offset-4">{t("analyticsCrm.cta.secondary")}</Link></div></div></section>

      <section className="section-shell bg-surface dark:bg-background"><div className="site-container"><p className="eyebrow">{t("analyticsCrm.related.eyebrow")}</p><div className="mt-8 grid border-t border-border-default md:grid-cols-2 lg:grid-cols-4">{relatedPages.map(page=><Link key={page} to={path(page)} className="focus-ring border-b border-border-default py-6 font-semibold text-text-primary md:px-6 dark:text-white">{t(`analyticsCrm.related.${page}`)}<ArrowRight className="mt-4 h-4 w-4 text-text-muted" aria-hidden="true"/></Link>)}</div></div></section>
    </main>
  );
}
