import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { buildLocalizedPath } from "../routing";
import { LeadSubmissionError, leadErrorTranslationKey, submitLead } from "../utils/leadSubmission";
import { buildConsultationRequest, LeadContractError } from "../api/leadContract";
import { emitCommercialEvent } from "../utils/measurement";

interface ConsultationFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  businessType: string;
  currentChallenges: string;
  goals: string;
  interestedServices: string[];
  preferredContact: string;
  preferredTime: string;
  additionalInfo: string;
  newsletter: boolean;
}

const initialFormData: ConsultationFormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  businessType: "",
  currentChallenges: "",
  goals: "",
  interestedServices: [],
  preferredContact: "",
  preferredTime: "",
  additionalInfo: "",
  newsletter: false,
};

const businessTypes = [
  "startup",
  "small_business",
  "medium_business",
  "large_business",
  "freelancer",
  "agency",
  "non_profit",
  "other",
] as const;
const serviceOptions = [
  "web",
  "seo",
  "social",
  "branding",
  "strategy",
] as const;
const contactOptions = ["phone", "whatsapp", "video", "meeting"] as const;
const timeOptions = ["morning", "afternoon", "evening", "flexible"] as const;

export function FreeConsultationPage() {
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const submissionInProgress = useRef(false);

  useEffect(() => {
    if (isSubmitted || submitError) statusRef.current?.focus();
  }, [isSubmitted, submitError]);

  const homePath = buildLocalizedPath(activeLocale, "home", {
    includeLocalePrefix,
  });
  const update = <K extends keyof ConsultationFormData>(
    field: K,
    value: ConsultationFormData[K],
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };
  const errorProps = (field: string) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });
  const errorMessage = (field: string) =>
    errors[field] ? (
      <p
        id={`${field}-error`}
        className="mt-2 text-sm text-red-600"
        role="alert"
      >
        {errors[field]}
      </p>
    ) : null;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.fullName.trim()) next.fullName = t("form.required_name");
    if (!formData.email.trim()) next.email = t("form.required_email");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      next.email = t("form.invalid_email");
    if (!formData.company.trim()) next.company = t("form.required_company");
    if (!formData.businessType)
      next.businessType = t("form.required_business_type");
    if (!formData.currentChallenges.trim())
      next.currentChallenges = t("form.required_field");
    if (!formData.goals.trim()) next.goals = t("form.required_field");
    if (!formData.interestedServices.length)
      next.interestedServices = t("form.required_services");
    if (!formData.preferredContact)
      next.preferredContact = t("form.required_contact");
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first === "interestedServices") {
      document
        .querySelector<HTMLInputElement>('input[name="interestedServices"]')
        ?.focus();
    } else if (first === "preferredContact") {
      document
        .querySelector<HTMLInputElement>('input[name="preferredContact"]')
        ?.focus();
    } else if (first) {
      document.getElementById(first)?.focus();
    }
    return !first;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submissionInProgress.current || isSubmitted) return;
    if (!validate()) return;
    submissionInProgress.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const request = buildConsultationRequest({
        ...formData,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        website: formData.website.trim(),
        currentChallenges: formData.currentChallenges.trim(),
        goals: formData.goals.trim(),
        additionalInfo: formData.additionalInfo.trim(),
        language,
      });
      await submitLead("/api/consultations", request);
      setIsSubmitted(true);
      emitCommercialEvent({ event: "consultation_submission_success", locale: language });
    } catch (caught) {
      if (caught instanceof LeadContractError) setErrors(Object.fromEntries(Object.keys(caught.fields).map((field) => [field, t("lead.error.field")])));
      if (caught instanceof LeadSubmissionError && caught.kind === "validation") setErrors(Object.fromEntries(Object.keys(caught.fields).map((field) => [field, t("lead.error.field")])));
      setSubmitError(t(caught instanceof LeadContractError ? "lead.error.validation" : leadErrorTranslationKey(caught)));
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-surface pb-20 pt-28 dark:bg-background">
        <div className="site-container max-w-3xl">
          <div
            ref={statusRef}
            tabIndex={-1}
            role="status"
            className="border-y border-border-default py-16 outline-none dark:border-border-default"
          >
            <CheckCircle
              className="h-9 w-9 text-emerald-600"
              aria-hidden="true"
            />
            <h1 className="mt-7 text-4xl font-semibold tracking-tight text-text-primary dark:text-white">
              {t("consultation.success.title")}
            </h1>
            <p className="lead-copy mt-5 max-w-2xl">
              {t("consultation.success.description")}
            </p>
            <h2 className="mt-10 font-semibold text-text-primary dark:text-white">
              {t("consultation.expect.title")}
            </h2>
            <ul className="mt-4 grid gap-3 text-text-secondary sm:grid-cols-2 dark:text-text-secondary">
              {["review", "strategy", "advice", "proposal"].map((item) => (
                <li key={item}>— {t(`consultation.expect.${item}`)}</li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                className="focus-ring min-h-12 rounded-md bg-accent px-6 font-semibold text-text-primary"
                onClick={() => navigate(homePath)}
              >
                {t("general.back_home")}
              </button>
              <button
                className="focus-ring min-h-12 border-b border-border-strong px-2 font-semibold text-text-primary dark:text-white"
                onClick={() => {
                  setFormData(initialFormData);
                  setIsSubmitted(false);
                }}
              >
                {t("form.new_consultation")}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const fieldClass =
    "mt-2 min-h-12 w-full rounded-md border border-border-default bg-transparent px-4 text-text-primary focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20 dark:border-border-default dark:text-white";
  return (
    <main className="min-h-screen bg-surface pb-20 pt-24 dark:bg-background">
      <div className="site-container max-w-5xl">
        <button
          className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-text-primary dark:text-white"
          onClick={() => navigate(homePath)}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("general.back_home")}
        </button>
        <header className="mt-12 grid gap-8 border-b border-border-default pb-14 dark:border-border-default lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{t("consultation.eyebrow")}</p>
            <h1 className="display-title mt-7 text-text-primary dark:text-white">
              {t("consultation.title")}
            </h1>
          </div>
          <p className="lead-copy lg:col-span-4 lg:self-end">
            {t("consultation.intro")}
          </p>
        </header>
        <section
          aria-labelledby="benefits-title"
          className="grid border-b border-border-default dark:border-border-default md:grid-cols-3"
        >
          <h2 id="benefits-title" className="sr-only">
            {t("consultation.benefits.title")}
          </h2>
          {["duration", "tailored", "free"].map((item) => (
            <div
              key={item}
              className="border-b border-border-subtle py-8 last:border-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <h3 className="font-semibold text-text-primary dark:text-white">
                {t(`consultation.benefit.${item}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-muted dark:text-text-muted">
                {t(`consultation.benefit.${item}.description`)}
              </p>
            </div>
          ))}
        </section>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-16"
          aria-labelledby="consultation-form-title"
        >
          <h2
            id="consultation-form-title"
            className="section-title text-text-primary dark:text-white"
          >
            {t("consultation.form.title")}
          </h2>
          <p className="mt-3 text-text-muted dark:text-text-muted">
            {t("consultation.form.description")}
          </p>
          <p className="mt-3 text-sm text-text-muted">
            {t("consultation.form.required_note")}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {(
              [
                [
                  "fullName",
                  "text",
                  "form.full_name",
                  "form.placeholder_full_name",
                  true,
                ],
                [
                  "email",
                  "email",
                  "form.email",
                  "form.placeholder_email",
                  true,
                ],
                ["phone", "tel", "form.phone", "form.placeholder_phone", false],
                [
                  "company",
                  "text",
                  "form.company",
                  "form.placeholder_company",
                  true,
                ],
                [
                  "website",
                  "url",
                  "form.website",
                  "form.placeholder_website",
                  false,
                ],
              ] as const
            ).map(([field, type, label, placeholder, required]) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="text-sm font-medium text-text-primary dark:text-slate-200"
                >
                  {t(label)}
                </label>
                <input
                  id={field}
                  type={type}
                  required={required}
                  value={formData[field]}
                  onChange={(e) => update(field, e.target.value)}
                  placeholder={t(placeholder)}
                  className={fieldClass}
                  {...errorProps(field)}
                />
                {errorMessage(field)}
              </div>
            ))}
            <div>
              <label
                htmlFor="businessType"
                className="text-sm font-medium text-text-primary dark:text-slate-200"
              >
                {t("consultation.form.business_type")} *
              </label>
              <select
                id="businessType"
                required
                value={formData.businessType}
                onChange={(e) => update("businessType", e.target.value)}
                className={fieldClass}
                {...errorProps("businessType")}
              >
                <option value="">{t("form.placeholder_business_type")}</option>
                {businessTypes.map((item) => (
                  <option key={item} value={item}>
                    {t(`consultation.business_type.${item}`)}
                  </option>
                ))}
              </select>
              {errorMessage("businessType")}
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="currentChallenges"
              className="text-sm font-medium text-text-primary dark:text-slate-200"
            >
              {t("consultation.form.challenges")} *
            </label>
            <textarea
              id="currentChallenges"
              required
              value={formData.currentChallenges}
              onChange={(e) => update("currentChallenges", e.target.value)}
              placeholder={t("form.placeholder_current_challenges")}
              className={`${fieldClass} min-h-28 py-3`}
              {...errorProps("currentChallenges")}
            />
            {errorMessage("currentChallenges")}
          </div>
          <div className="mt-6">
            <label
              htmlFor="goals"
              className="text-sm font-medium text-text-primary dark:text-slate-200"
            >
              {t("consultation.form.goals")} *
            </label>
            <textarea
              id="goals"
              required
              value={formData.goals}
              onChange={(e) => update("goals", e.target.value)}
              placeholder={t("form.placeholder_goals")}
              className={`${fieldClass} min-h-28 py-3`}
              {...errorProps("goals")}
            />
            {errorMessage("goals")}
          </div>
          <fieldset
            className="mt-8"
            aria-describedby={
              errors.interestedServices ? "interestedServices-error" : undefined
            }
          >
            <legend className="text-sm font-medium text-text-primary dark:text-slate-200">
              {t("consultation.form.services")} *
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {serviceOptions.map((service) => (
                <label
                  key={service}
                  className="flex min-h-11 items-center gap-3 text-text-secondary dark:text-text-secondary"
                >
                  <input
                    type="checkbox"
                    name="interestedServices"
                    checked={formData.interestedServices.includes(service)}
                    onChange={(e) =>
                      update(
                        "interestedServices",
                        e.target.checked
                          ? [...formData.interestedServices, service]
                          : formData.interestedServices.filter(
                              (item) => item !== service,
                            ),
                      )
                    }
                  />
                  {t(`services.${service}.title`)}
                </label>
              ))}
            </div>
            {errorMessage("interestedServices")}
          </fieldset>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <fieldset
              aria-describedby={
                errors.preferredContact ? "preferredContact-error" : undefined
              }
            >
              <legend className="text-sm font-medium text-text-primary dark:text-slate-200">
                {t("consultation.form.preferred_contact")} *
              </legend>
              <div className="mt-4 space-y-2">
                {contactOptions.map((option) => (
                  <label
                    key={option}
                    className="flex min-h-11 items-center gap-3 text-text-secondary dark:text-text-secondary"
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      required
                      value={option}
                      checked={formData.preferredContact === option}
                      onChange={(e) =>
                        update("preferredContact", e.target.value)
                      }
                    />
                    {t(`consultation.contact.${option}`)}
                  </label>
                ))}
              </div>
              {errorMessage("preferredContact")}
            </fieldset>
            <div>
              <label
                htmlFor="preferredTime"
                className="text-sm font-medium text-text-primary dark:text-slate-200"
              >
                {t("consultation.form.preferred_time")}
              </label>
              <select
                id="preferredTime"
                value={formData.preferredTime}
                onChange={(e) => update("preferredTime", e.target.value)}
                className={fieldClass}
              >
                <option value="">{t("form.placeholder_preferred_time")}</option>
                {timeOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(`consultation.time.${option}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-8">
            <label
              htmlFor="additionalInfo"
              className="text-sm font-medium text-text-primary dark:text-slate-200"
            >
              {t("form.additional_info_label")}
            </label>
            <textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => update("additionalInfo", e.target.value)}
              placeholder={t("form.placeholder_additional_info_consult")}
              className={`${fieldClass} min-h-24 py-3`}
            />
          </div>
          <label className="mt-6 flex min-h-11 items-center gap-3 text-sm text-text-secondary dark:text-text-secondary">
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={(e) => update("newsletter", e.target.checked)}
            />
            {t("consultation.form.newsletter")}
          </label>
          {submitError && (
            <div
              ref={statusRef}
              tabIndex={-1}
              role="alert"
              className="mt-6 border-l-2 border-red-600 pl-4 text-sm text-red-600 outline-none"
            >
              {submitError}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="focus-ring mt-8 inline-flex min-h-12 items-center rounded-md bg-accent px-7 font-semibold text-text-primary disabled:opacity-60"
          >
            <Send className="mr-2 h-4 w-4" aria-hidden="true" />
            {isSubmitting
              ? t("form.scheduling")
              : t("form.submit_consultation")}
          </button>
        </form>
      </div>
    </main>
  );
}
