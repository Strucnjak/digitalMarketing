import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Building, Globe, Mail, Phone, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useLanguage } from "../LanguageContext";
import type { InquiryFormData } from "../ServiceInquiryForm";
import { useMemo } from "react";

interface Step1Props {
  formData: InquiryFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  updateFormData: (field: keyof InquiryFormData, value: unknown) => void;
  handleBlur: (field: keyof InquiryFormData) => void;
}

function TooltipInput({
  name,
  label,
  icon,
  value,
  placeholder,
  error,
  touched,
  autoComplete,
  type = "text",
  onChange,
  onBlur,
}: {
  name: keyof InquiryFormData;
  label: string;
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  error?: string;
  touched?: boolean;
  autoComplete?: string;
  type?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}) {
  const errorId = `${name}-error`;

  return (
    <div>
      <Label htmlFor={name} className="flex items-center gap-2 mb-2 text-bdigital-navy">
        {icon}
        {label}
      </Label>
      <Tooltip open={!!error && touched}>
        <TooltipTrigger asChild>
          <Input
            id={name}
            name={name}
            type={type}
            autoComplete={autoComplete}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            placeholder={placeholder}
            className={`w-full border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan ${error && touched ? "border-red-500" : ""}`}
          />
        </TooltipTrigger>
        {error && (
          <TooltipContent id={errorId} side="right">
            {error}
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
}

export function Step1({ formData, errors, touched, updateFormData, handleBlur }: Step1Props) {
  const { t } = useLanguage();

  const labels = useMemo(
    () => ({
      fullName: t("form.full_name"),
      placeholderFullName: t("form.placeholder_full_name"),
      email: t("form.email"),
      placeholderEmail: t("form.placeholder_email"),
      phone: t("form.phone"),
      placeholderPhone: t("form.placeholder_phone"),
      company: t("form.company"),
      placeholderCompany: t("form.placeholder_company"),
      website: t("form.website"),
      placeholderWebsite: t("form.placeholder_website"),
    }),
    [t]
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TooltipInput
          name="fullName"
          label={labels.fullName}
          icon={<User className="h-4 w-4" />}
          value={formData.fullName}
          placeholder={labels.placeholderFullName}
          error={errors.fullName}
          touched={touched.fullName}
          autoComplete="name"
          onChange={(value) => updateFormData("fullName", value)}
          onBlur={() => handleBlur("fullName")}
        />
        <TooltipInput
          name="email"
          label={labels.email}
          icon={<Mail className="h-4 w-4" />}
          value={formData.email}
          placeholder={labels.placeholderEmail}
          error={errors.email}
          touched={touched.email}
          type="email"
          autoComplete="email"
          onChange={(value) => updateFormData("email", value)}
          onBlur={() => handleBlur("email")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TooltipInput
          name="phone"
          label={labels.phone}
          icon={<Phone className="h-4 w-4" />}
          value={formData.phone}
          placeholder={labels.placeholderPhone}
          error={errors.phone}
          touched={touched.phone}
          autoComplete="tel"
          onChange={(value) => updateFormData("phone", value)}
          onBlur={() => handleBlur("phone")}
        />
        <TooltipInput
          name="company"
          label={labels.company}
          icon={<Building className="h-4 w-4" />}
          value={formData.company}
          placeholder={labels.placeholderCompany}
          error={errors.company}
          touched={touched.company}
          autoComplete="organization"
          onChange={(value) => updateFormData("company", value)}
          onBlur={() => handleBlur("company")}
        />
      </div>

      <TooltipInput
        name="website"
        label={labels.website}
        icon={<Globe className="h-4 w-4" />}
        value={formData.website}
        placeholder={labels.placeholderWebsite}
        error={errors.website}
        touched={touched.website}
        autoComplete="url"
        onChange={(value) => updateFormData("website", value)}
        onBlur={() => handleBlur("website")}
      />
    </div>
  );
}
