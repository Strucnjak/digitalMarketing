import { useRef, useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "./LanguageContext";
import { ADDRESS, EMAIL, PHONE } from "../config/contact";
import { submitLead } from "../utils/leadSubmission";
import { emitCommercialEvent } from "../utils/measurement";

export function ContactSection() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submissionInProgress = useRef(false);

  const change = (field: keyof typeof formData, value: string) =>
    setFormData((current) => ({ ...current, [field]: value }));
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submissionInProgress.current || isSubmitted) return;
    submissionInProgress.current = true;
    setIsSubmitting(true);
    setError(null);
    try {
      await submitLead("/api/contact", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        message: formData.message.trim(),
        phone: formData.phone.trim(),
        language,
      });
      setIsSubmitted(true);
      emitCommercialEvent({ event: "contact_submission_success", locale: language });
      setFormData({ name: "", email: "", company: "", message: "", phone: "" });
    } catch {
      setError(t("contact.error.submit"));
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };
  const fieldClass =
    "h-12 rounded-md border-slate-300 bg-transparent px-4 focus-visible:border-bdigital-cyan focus-visible:ring-bdigital-cyan/20 dark:border-slate-700 dark:bg-transparent dark:text-white";

  return (
    <section
      id="contact"
      className="section-shell bg-white dark:bg-bdigital-midnight"
    >
      <div className="site-container grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-7">{t("contact.badge")}</p>
          <h2 className="section-title text-bdigital-navy dark:text-white">
            {t("contact.heading.part1")} {t("contact.heading.emphasis")}
          </h2>
          <p className="lead-copy mt-7">{t("contact.description")}</p>

          <address className="mt-12 space-y-7 border-t border-slate-300 pt-8 not-italic dark:border-slate-700">
            <div>
              <p className="text-xs font-medium text-slate-500">
                {t("contact.info.email")}
              </p>
              <a
                className="focus-ring mt-1 inline-block font-semibold text-bdigital-navy underline decoration-slate-300 underline-offset-4 hover:decoration-bdigital-cyan dark:text-white"
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                {t("contact.info.phone")}
              </p>
              <a
                className="focus-ring mt-1 inline-block font-semibold text-bdigital-navy underline decoration-slate-300 underline-offset-4 hover:decoration-bdigital-cyan dark:text-white"
                href={`tel:${PHONE.replace(/\s+/g, "")}`}
              >
                {PHONE}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                {t("contact.info.location")}
              </p>
              <p className="mt-1 font-semibold text-bdigital-navy dark:text-white">
                {ADDRESS}
              </p>
            </div>
          </address>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {isSubmitted ? (
            <div
              className="flex min-h-96 flex-col justify-center border-y border-slate-300 py-16 dark:border-slate-700"
              role="status"
            >
              <CheckCircle className="h-10 w-10 text-emerald-600" />
              <h3 className="mt-6 text-3xl font-semibold text-bdigital-navy dark:text-white">
                {t("contact.success.title")}
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                {t("contact.success.desc")}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="border-t border-slate-300 pt-8 dark:border-slate-700"
            >
              <h3 className="mb-8 text-2xl font-semibold text-bdigital-navy dark:text-white">
                {t("contact.form.title")}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="text-sm font-medium text-bdigital-navy dark:text-slate-200">
                  {t("contact.name")} *
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => change("name", e.target.value)}
                    placeholder={t("form.placeholder_full_name")}
                    className={`mt-2 ${fieldClass}`}
                  />
                </label>
                <label className="text-sm font-medium text-bdigital-navy dark:text-slate-200">
                  {t("contact.email")} *
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => change("email", e.target.value)}
                    placeholder={t("form.placeholder_email")}
                    className={`mt-2 ${fieldClass}`}
                  />
                </label>
                <label className="text-sm font-medium text-bdigital-navy dark:text-slate-200">
                  {t("contact.company")}
                  <Input
                    value={formData.company}
                    onChange={(e) => change("company", e.target.value)}
                    placeholder={t("form.placeholder_company")}
                    className={`mt-2 ${fieldClass}`}
                  />
                </label>
                <label className="text-sm font-medium text-bdigital-navy dark:text-slate-200">
                  {t("contact.phone")}
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => change("phone", e.target.value)}
                    placeholder={t("form.placeholder_phone")}
                    className={`mt-2 ${fieldClass}`}
                  />
                </label>
              </div>
              <label className="mt-6 block text-sm font-medium text-bdigital-navy dark:text-slate-200">
                {t("contact.message")} *
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => change("message", e.target.value)}
                  placeholder={t("form.placeholder_additional_info")}
                  className="mt-2 min-h-36 resize-y rounded-md border-slate-300 bg-transparent p-4 focus-visible:border-bdigital-cyan focus-visible:ring-bdigital-cyan/20 dark:border-slate-700 dark:bg-transparent dark:text-white"
                />
              </label>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="focus-ring mt-8 min-h-12 w-full rounded-md bg-bdigital-cyan font-semibold text-bdigital-navy shadow-none hover:bg-bdigital-cyan-light sm:w-auto sm:px-8"
              >
                <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                {isSubmitting ? t("contact.sending") : t("contact.send")}
              </Button>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                {t("contact.privacy")}
              </p>
              {error && (
                <p className="mt-4 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
