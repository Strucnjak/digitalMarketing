import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ArrowLeft, Send, CheckCircle, User, DollarSign, Target, ChevronRight, Check, Package, Star } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { Step1 } from "./serviceInquirySteps/Step1";
import { Step2 } from "./serviceInquirySteps/Step2";
import { Step3 } from "./serviceInquirySteps/Step3";
import { Step4 } from "./serviceInquirySteps/Step4";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { buildLocalizedPath } from "../routing";

export interface InquiryFormData {
  // Contact Information
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;

  // Service Information
  selectedService: string;
  selectedPackage: string;

  // Project Details
  projectTypes: string[];
  currentSituation: string;
  projectGoals: string;
  targetAudience: string;

  // Timeline & Budget
  timeline: string;
  budget: string;

  // Additional Services
  additionalServices: string[];

  // Communication
  preferredContact: string;
  additionalInfo: string;

  // Marketing
  howDidYouHear: string;
  newsletter: boolean;
}
export function ServiceInquiryForm() {
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const serviceInfo: Record<string, { title: string; description: string; icon: string }> = {
    "web-design": { title: t("services.web.title"), description: t("services.web.desc"), icon: "🎨" },
    seo: { title: t("services.seo.title"), description: t("services.seo.desc"), icon: "🔍" },
    "social-media": { title: t("services.social.title"), description: t("services.social.desc"), icon: "📱" },
    branding: { title: t("services.branding.title"), description: t("services.branding.desc"), icon: "✨" },
    strategy: { title: t("services.strategy.title"), description: t("services.strategy.desc"), icon: "📊" },
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    selectedService: "",
    selectedPackage: "",
    projectTypes: [],
    currentSituation: "",
    projectGoals: "",
    targetAudience: "",
    timeline: "",
    budget: "",
    additionalServices: [],
    preferredContact: "",
    additionalInfo: "",
    howDidYouHear: "",
    newsletter: false,
  });

  const steps = [
    { id: 1, title: t("form.step1.title"), description: t("form.step1.desc"), icon: User },
    { id: 2, title: t("form.step2.title"), description: t("form.step2.desc"), icon: Target },
    { id: 3, title: t("form.step3.title"), description: t("form.step3.desc"), icon: DollarSign },
    { id: 4, title: t("form.step4.title"), description: t("form.step4.desc"), icon: CheckCircle },
  ];

  // Get service and package from URL params or local storage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get("service") || localStorage.getItem("selectedService") || "";
    const packageName = urlParams.get("package") || localStorage.getItem("selectedPackage") || "";

    if (service || packageName) {
      setFormData((prev) => ({
        ...prev,
        selectedService: service,
        selectedPackage: packageName,
      }));
    }
  }, []);

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: keyof InquiryFormData, value: unknown): string => {
    switch (field) {
      case "fullName":
        return !String(value).trim() ? t("form.required_name") : "";
      case "email":
        if (!String(value).trim()) return t("form.required_email");
        return /\S+@\S+\.\S+/.test(String(value)) ? "" : t("form.invalid_email");
      case "company":
        return !String(value).trim() ? t("form.required_company") : "";
      case "projectTypes":
        return (value as string[]).length === 0 ? t("form.required_project_types") : "";
      case "currentSituation":
      case "projectGoals":
        return !String(value).trim() ? t("form.required_field") : "";
      case "timeline":
        return !value ? t("form.required_timeline") : "";
      case "budget":
        return !value ? t("form.required_budget") : "";
      case "preferredContact":
        return !value ? t("form.required_contact") : "";
      default:
        return "";
    }
  };

  const updateFormData = (field: keyof InquiryFormData, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setTouched((prev) => ({ ...prev, [field]: true }));

    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  };

  const handleBlur = (field: keyof InquiryFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = t("form.required_name");
        if (!formData.email.trim()) newErrors.email = t("form.required_email");
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t("form.invalid_email");
        if (!formData.company.trim()) newErrors.company = t("form.required_company");
        break;
      case 2:
        if (formData.projectTypes.length === 0) newErrors.projectTypes = t("form.required_project_types");
        if (!formData.currentSituation.trim()) newErrors.currentSituation = t("form.required_field");
        if (!formData.projectGoals.trim()) newErrors.projectGoals = t("form.required_field");
        break;
      case 3:
        if (!formData.timeline) newErrors.timeline = t("form.required_timeline");
        if (!formData.budget) newErrors.budget = t("form.required_budget");
        break;
      case 4:
        if (!formData.preferredContact) newErrors.preferredContact = t("form.required_contact");
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProjectTypeChange = (projectType: string, checked: boolean) => {
    const newValue = checked ? [...formData.projectTypes, projectType] : formData.projectTypes.filter((type) => type !== projectType);

    updateFormData("projectTypes", newValue);
  };

  const handleAdditionalServicesChange = (service: string, checked: boolean) => {
    const newValue = checked ? [...formData.additionalServices, service] : formData.additionalServices.filter((s) => s !== service);

    updateFormData("additionalServices", newValue);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/service-inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, language }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.error || "Failed to submit inquiry";
        throw new Error(message);
      }

      setIsSubmitted(true);

      // Clear stored service/package info
      localStorage.removeItem("selectedService");
      localStorage.removeItem("selectedPackage");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit inquiry";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  // Get service information for display
  const currentServiceInfo = formData.selectedService ? serviceInfo[formData.selectedService] : null;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-16 pt-20 dark:from-bdigital-midnight dark:to-bdigital-dark-navy">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-2xl dark:border dark:border-bdigital-dark-navy dark:bg-bdigital-night">
            <CardContent className="p-8 text-center lg:p-12">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-emerald-900/40">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-emerald-300" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-bdigital-navy lg:text-3xl dark:text-slate-100">{t("form.success_title")}</h2>
              <p className="mb-8 text-lg text-neutral-gray leading-relaxed dark:text-slate-300">
                {t("form.success_intro")}{" "}
                {currentServiceInfo?.title && formData.selectedPackage
                  ? `${currentServiceInfo.title} - ${formData.selectedPackage}`
                  : t("form.success_project")}
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    const path = buildLocalizedPath(activeLocale, "home", { includeLocalePrefix });
                    navigate(path);
                  }}
                  className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold px-8 py-3"
                >
                  {t("general.back_home")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      company: "",
                      website: "",
                      selectedService: "",
                      selectedPackage: "",
                      projectTypes: [],
                      currentSituation: "",
                      projectGoals: "",
                      targetAudience: "",
                      timeline: "",
                      budget: "",
                      additionalServices: [],
                      preferredContact: "",
                      additionalInfo: "",
                      howDidYouHear: "",
                      newsletter: false,
                    });
                  }}
                  className="border-bdigital-cyan-dark text-bdigital-cyan-dark hover:bg-bdigital-cyan hover:text-bdigital-navy font-semibold px-8 py-3 dark:text-bdigital-cyan dark:hover:text-slate-900"
                >
                  {t("form.new_quote")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-16 pt-20 dark:from-bdigital-midnight dark:to-bdigital-dark-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => {
              const path = buildLocalizedPath(activeLocale, "home", { includeLocalePrefix });
              navigate(path);
            }}
            className="mb-6 -ml-2 text-bdigital-navy hover:text-bdigital-cyan-dark dark:text-slate-100 dark:hover:text-bdigital-cyan"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("general.back_home")}
          </Button>

          <div className="text-center mb-8">
            <h1 className="mb-4 text-3xl font-bold text-bdigital-navy sm:text-4xl lg:text-5xl dark:text-slate-100">{t("inquiry.title")}</h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-gray dark:text-slate-300">{t("inquiry.subtitle")}</p>
          </div>

          {/* Service & Package Display - Enhanced */}
          {(formData.selectedService || formData.selectedPackage) && (
            <div className="mb-8">
              <Card className="border-bdigital-cyan/20 bg-gradient-to-r from-bdigital-cyan/5 to-bdigital-navy/5 dark:border-bdigital-cyan/40 dark:from-bdigital-cyan/10 dark:to-bdigital-navy/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-bdigital-cyan/10 rounded-xl flex items-center justify-center">
                      <Package className="h-6 w-6 text-bdigital-cyan" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-bdigital-navy dark:text-slate-100">{t("form.selected_service_title")}</h3>
                      <p className="text-sm text-neutral-gray dark:text-slate-300">{t("form.selected_service_desc")}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {currentServiceInfo && (
                      <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 dark:border-bdigital-dark-navy dark:bg-bdigital-night">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{currentServiceInfo.icon}</span>
                          <div>
                            <div className="font-medium text-bdigital-navy dark:text-slate-100">{currentServiceInfo.title}</div>
                            <div className="text-sm text-neutral-gray dark:text-slate-300">{currentServiceInfo.description}</div>
                          </div>
                        </div>
                        <Badge className="bg-bdigital-cyan text-bdigital-navy">
                          <Star className="h-3 w-3 mr-1" />
                          {t("form.chosen")}
                        </Badge>
                      </div>
                    )}

                    {formData.selectedPackage && (
                      <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 dark:border-bdigital-dark-navy dark:bg-bdigital-night">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-bdigital-navy/10 rounded-lg flex items-center justify-center">
                            <Package className="h-4 w-4 text-bdigital-navy" />
                          </div>
                          <div>
                            <div className="font-medium text-bdigital-navy dark:text-slate-100">
                              {t("form.package_prefix")} {formData.selectedPackage}
                            </div>
                            <div className="text-sm text-neutral-gray dark:text-slate-300">{t("form.selected_package_desc")}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-bdigital-navy text-bdigital-navy dark:border-slate-300 dark:text-slate-100">
                          {t("form.package_badge")}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-neutral-gray dark:text-slate-300">Korak {currentStep} od 4</span>
            <span className="text-sm text-neutral-gray dark:text-slate-300">{Math.round(progressPercentage)}% završeno</span>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-6" />

          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                      isCompleted
                        ? "bg-bdigital-cyan text-bdigital-navy"
                        : isActive
                          ? "bg-bdigital-navy text-white"
                          : "bg-gray-200 text-gray-500 dark:bg-bdigital-dark-navy dark:text-slate-400"
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <IconComponent className="h-5 w-5" />}
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-medium ${isActive ? "text-bdigital-navy dark:text-slate-100" : "text-neutral-gray dark:text-slate-400"}`}>
                      {step.title}
                    </div>
                    <div className="hidden text-xs text-neutral-gray sm:block dark:text-slate-500">{step.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="border-0 shadow-2xl dark:border dark:border-bdigital-dark-navy dark:bg-bdigital-night">
          <CardHeader>
            <CardTitle className="text-2xl text-bdigital-navy dark:text-slate-100">{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Step1 formData={formData} errors={errors} touched={touched} updateFormData={updateFormData} handleBlur={handleBlur} />
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Step2
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    updateFormData={updateFormData}
                    handleProjectTypeChange={handleProjectTypeChange}
                    handleBlur={handleBlur}
                  />
                </motion.div>
              )}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Step3
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    updateFormData={updateFormData}
                    handleAdditionalServicesChange={handleAdditionalServicesChange}
                    handleBlur={handleBlur}
                  />
                </motion.div>
              )}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Step4 formData={formData} errors={errors} touched={touched} updateFormData={updateFormData} handleBlur={handleBlur} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-bdigital-dark-navy">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-bdigital-cyan-dark text-bdigital-cyan-dark hover:bg-bdigital-cyan hover:text-bdigital-navy disabled:cursor-not-allowed disabled:opacity-50 dark:text-bdigital-cyan dark:hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("general.back")}
              </Button>

              {currentStep < 4 ? (
                <Button onClick={nextStep} className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold px-8 py-3">
                  {t("form.next_step")}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold px-8 py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-bdigital-navy mr-2"></div>
                      {t("form.submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      {t("form.submit_inquiry")}
                    </>
                  )}
                </Button>
              )}
            </div>
            {submitError && <p className="text-red-500 text-sm text-center mt-4">{submitError}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
