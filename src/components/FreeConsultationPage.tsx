import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  ArrowLeft,
  CheckCircle,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  AlertCircle,
  Gift,
  Calendar,
  Clock,
  Target,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useActiveLocale } from "../hooks/useActiveLocale";
import { buildLocalizedPath } from "../routing";
import { useAdminData } from "./AdminDataContext";

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

export function FreeConsultationPage() {
  const navigate = useNavigate();
  const { activeLocale, includeLocalePrefix } = useActiveLocale();
  const { t, language } = useLanguage();
  const { addNotification } = useAdminData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const createNotificationId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `notify-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const [formData, setFormData] = useState<ConsultationFormData>({
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
  });

  const updateFormData = (field: keyof ConsultationFormData, value: ConsultationFormData[keyof ConsultationFormData]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = t("form.required_name");
    if (!formData.email.trim()) newErrors.email = t("form.required_email");
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t("form.invalid_email");
    if (!formData.company.trim()) newErrors.company = t("form.required_company");
    if (!formData.businessType) newErrors.businessType = t("form.required_business_type");
    if (!formData.currentChallenges.trim()) newErrors.currentChallenges = t("form.required_field");
    if (!formData.goals.trim()) newErrors.goals = t("form.required_field");
    if (formData.interestedServices.length === 0) newErrors.interestedServices = t("form.required_services");
    if (!formData.preferredContact) newErrors.preferredContact = t("form.required_contact");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServicesChange = (service: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interestedServices: checked ? [...prev.interestedServices, service] : prev.interestedServices.filter((s) => s !== service),
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/consultations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, language }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.error || "Failed to submit consultation request";
        throw new Error(message);
      }

      setIsSubmitted(true);

      addNotification({
        id: createNotificationId(),
        type: "consultation",
        createdAt: Date.now(),
        details: `${formData.fullName || "Posjetilac"} je tražio konsultaciju (${formData.businessType || "biznis"}).`,
        payload: formData,
        status: "new",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit consultation request";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-2xl overflow-visible">
            <CardContent className="p-8 lg:p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-bdigital-navy mb-4">Vaša besplatna konsultacija je zakazana!</h2>
              <p className="text-neutral-gray text-lg mb-8 leading-relaxed">
                Hvala vam na interesu! Kontaktiraćemo vas u roku od 24 sata da zakazujemo termin za vašu besplatnu konsultaciju. Pripremićemo
                personalizovanu analizu i strategiju za vaš digitalni uspeh.
              </p>
              <div className="bg-bdigital-cyan/10 border border-bdigital-cyan/20 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-bdigital-navy mb-3">Šta možete očekivati na konsultaciji:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-bdigital-navy">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-bdigital-cyan-dark" />
                    <span>Analiza trenutnog stanja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-bdigital-cyan-dark" />
                    <span>Strategija za rast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-bdigital-cyan-dark" />
                    <span>Konkretni saveti</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-bdigital-cyan-dark" />
                    <span>Personalizovana ponuda</span>
                  </div>
                </div>
              </div>
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
                    setFormData({
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
                    });
                  }}
                  className="border-bdigital-cyan-dark text-bdigital-cyan-dark hover:bg-bdigital-cyan hover:text-bdigital-navy font-semibold px-8 py-3"
                >
                  {t("form.new_consultation")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => {
              const path = buildLocalizedPath(activeLocale, "home", { includeLocalePrefix });
              navigate(path);
            }}
            className="text-bdigital-navy hover:text-bdigital-cyan-dark mb-6 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("general.back_home")}
          </Button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-bdigital-cyan/10 rounded-2xl flex items-center justify-center">
                <Gift className="h-8 w-8 text-bdigital-cyan-dark" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bdigital-navy">
                <span className="text-bdigital-cyan-dark">Besplatna</span> konsultacija
              </h1>
            </div>
            <p className="text-xl text-neutral-gray max-w-3xl mx-auto leading-relaxed mb-8">
              Zakazite vašu besplatnu digitalnu konsultaciju sa našim ekspertima. Analiziraćemo vaš trenutni digitalni pristup i dati konkretne
              preporuke za unapređenje.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-bdigital-cyan/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-bdigital-cyan-dark" />
                </div>
                <h3 className="font-semibold text-bdigital-navy mb-2">45 minuta</h3>
                <p className="text-sm text-neutral-gray">Detaljne analize i konkretni saveti</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-bdigital-cyan/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-bdigital-cyan-dark" />
                </div>
                <h3 className="font-semibold text-bdigital-navy mb-2">Personalizovano</h3>
                <p className="text-sm text-neutral-gray">Strategija prilagođena vašem biznisu</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-bdigital-cyan/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-6 w-6 text-bdigital-cyan-dark" />
                </div>
                <h3 className="font-semibold text-bdigital-navy mb-2">100% besplatno</h3>
                <p className="text-sm text-neutral-gray">Bez skrivenih troškova ili obaveza</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-2xl overflow-visible">
          <CardHeader>
            <CardTitle className="text-2xl text-bdigital-navy text-center">Zakazivanje konsultacije</CardTitle>
            <p className="text-center text-neutral-gray">Popunite formu ispod da zakazujete vašu besplatnu konsultaciju</p>
          </CardHeader>
          <CardContent className="p-6 lg:p-8">
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
                    <User className="h-4 w-4" />
                    Ime i prezime *
                  </Label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    placeholder={t("form.placeholder_full_name")}
                    className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan ${errors.fullName ? "border-red-500" : ""}`}
                  />
                  {errors.fullName && (
                    <div className="flex items-center mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.fullName}
                    </div>
                  )}
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
                    <Mail className="h-4 w-4" />
                    Email adresa *
                  </Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder={t("form.placeholder_email")}
                    className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <div className="flex items-center mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
                    <Phone className="h-4 w-4" />
                    Telefon *
                  </Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder={t("form.placeholder_phone")}
                    className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan"
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
                    <Building className="h-4 w-4" />
                    Kompanija/Organizacija *
                  </Label>
                  <Input
                    value={formData.company}
                    onChange={(e) => updateFormData("company", e.target.value)}
                    placeholder={t("form.placeholder_company")}
                    className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan ${errors.company ? "border-red-500" : ""}`}
                  />
                  {errors.company && (
                    <div className="flex items-center mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.company}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
                    <Globe className="h-4 w-4" />
                    Website (ako postoji)
                  </Label>
                  <Input
                    value={formData.website}
                    onChange={(e) => updateFormData("website", e.target.value)}
                    placeholder={t("form.placeholder_website")}
                    className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan"
                  />
                </div>
                <div className="relative z-20">
                  <Label className="mb-2 block text-bdigital-navy">Tip biznisa *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => updateFormData("businessType", value)}>
                    <SelectTrigger className={`border-gray-300 focus:border-bdigital-cyan ${errors.businessType ? "border-red-500" : ""}`}>
                      <SelectValue placeholder={t("form.placeholder_business_type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="small-business">Malo preduzeće</SelectItem>
                      <SelectItem value="medium-business">Srednje preduzeće</SelectItem>
                      <SelectItem value="large-business">Veliko preduzeće</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="agency">Agencija</SelectItem>
                      <SelectItem value="non-profit">Non-profit organizacija</SelectItem>
                      <SelectItem value="other">Ostalo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.businessType && (
                    <div className="flex items-center mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.businessType}
                    </div>
                  )}
                </div>
              </div>

              {/* Business Challenges */}
              <div>
                <Label className="mb-2 block text-bdigital-navy">Trenutni digitalni izazovi *</Label>
                <Textarea
                  value={formData.currentChallenges}
                  onChange={(e) => updateFormData("currentChallenges", e.target.value)}
                  placeholder={t("form.placeholder_current_challenges")}
                  className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan min-h-[100px] resize-none ${
                    errors.currentChallenges ? "border-red-500" : ""
                  }`}
                />
                {errors.currentChallenges && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.currentChallenges}
                  </div>
                )}
              </div>

              {/* Goals */}
              <div>
                <Label className="mb-2 block text-bdigital-navy">Vaši ciljevi *</Label>
                <Textarea
                  value={formData.goals}
                  onChange={(e) => updateFormData("goals", e.target.value)}
                  placeholder={t("form.placeholder_goals")}
                  className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan min-h-[100px] resize-none ${
                    errors.goals ? "border-red-500" : ""
                  }`}
                />
                {errors.goals && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.goals}
                  </div>
                )}
              </div>

              {/* Interested Services */}
              <div>
                <Label className="mb-3 block text-bdigital-navy">Usluge koje vas zanimaju * (možete odabrati više)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Web design & development",
                    "SEO optimizacija",
                    "Social media marketing",
                    "Google Ads kampanje",
                    "Branding & logo dizajn",
                    "Content marketing",
                    "Email marketing",
                    "Marketing strategija",
                  ].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.interestedServices.includes(service)}
                        onCheckedChange={(checked) => handleServicesChange(service, checked as boolean)}
                        className="border-gray-300"
                      />
                      <Label className="text-sm font-normal text-neutral-gray">{service}</Label>
                    </div>
                  ))}
                </div>
                {errors.interestedServices && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.interestedServices}
                  </div>
                )}
              </div>

              {/* Contact Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-3 block text-bdigital-navy">Preferirani način kontakta *</Label>
                  <RadioGroup value={formData.preferredContact} onValueChange={(value) => updateFormData("preferredContact", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" />
                      <Label className="text-neutral-gray">Telefon</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whatsapp" />
                      <Label className="text-neutral-gray">WhatsApp</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video-call" />
                      <Label className="text-neutral-gray">Video poziv (Zoom/Meet)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="meeting" />
                      <Label className="text-neutral-gray">Lični sastanak</Label>
                    </div>
                  </RadioGroup>
                  {errors.preferredContact && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.preferredContact}
                    </div>
                  )}
                </div>
                <div className="relative z-20">
                  <Label className="mb-2 block text-bdigital-navy">Preferirano vreme</Label>
                  <Select value={formData.preferredTime} onValueChange={(value) => updateFormData("preferredTime", value)}>
                    <SelectTrigger className="border-gray-300 focus:border-bdigital-cyan">
                      <SelectValue placeholder={t("form.placeholder_preferred_time")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Ujutru (09:00-12:00)</SelectItem>
                      <SelectItem value="afternoon">Popodne (12:00-16:00)</SelectItem>
                      <SelectItem value="evening">Uveče (16:00-19:00)</SelectItem>
                      <SelectItem value="flexible">Fleksibilno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
                  <MessageSquare className="h-4 w-4" />
                  Dodatne informacije
                </Label>
                <Textarea
                  value={formData.additionalInfo}
                  onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                  placeholder={t("form.placeholder_additional_info_consult")}
                  className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan min-h-[80px] resize-none"
                />
              </div>

              {/* Newsletter */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => updateFormData("newsletter", checked)}
                  className="border-gray-300"
                />
                <Label className="text-sm font-normal text-neutral-gray">Želim da primam newsletter sa digitalnim marketing savetima</Label>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold py-4 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-bdigital-navy mr-2"></div>
                      {t("form.scheduling")}
                    </>
                  ) : (
                    <>
                      <Calendar className="h-5 w-5 mr-2" />
                      {t("form.submit_consultation")}
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-neutral-gray mt-3">Kontaktiraćemo vas u roku od 24 sata da potvrdimo termin</p>
                {submitError && <p className="text-red-500 text-sm text-center mt-4">{submitError}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
