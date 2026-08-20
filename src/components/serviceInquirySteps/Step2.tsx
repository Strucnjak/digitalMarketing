import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useLanguage } from "../LanguageContext";
import type { InquiryFormData } from "../ServiceInquiryForm";

interface Step2Props {
  formData: InquiryFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  updateFormData: (field: keyof InquiryFormData, value: unknown) => void;
  handleProjectTypeChange: (projectType: string, checked: boolean) => void;
  handleBlur: (field: keyof InquiryFormData) => void;
}

export function Step2({ formData, errors, touched, updateFormData, handleProjectTypeChange, handleBlur }: Step2Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block text-text-primary dark:text-slate-200">{t("form.project_types_label")}</Label>
        <Tooltip open={!!errors.projectTypes && touched.projectTypes}>
          <TooltipTrigger asChild>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { value: "new-website", label: t("form.project_type.new_website") },
                { value: "redesign", label: t("form.project_type.redesign") },
                { value: "ecommerce", label: t("form.project_type.ecommerce") },
                { value: "mobile-app", label: t("form.project_type.mobile_app") },
                { value: "seo-optimization", label: t("form.project_type.seo_optimization") },
                { value: "social-media", label: t("form.project_type.social_media") },
                { value: "branding", label: t("form.project_type.branding") },
                { value: "marketing-strategy", label: t("form.project_type.marketing_strategy") },
                { value: "other", label: t("form.project_type.other") },
              ].map((projectType) => (
                <div key={projectType.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.projectTypes.includes(projectType.value)}
                    onCheckedChange={(checked) => handleProjectTypeChange(projectType.value, checked as boolean)}
                    className="border-border-default dark:border-border-default"
                  />
                  <Label className="text-sm font-normal text-text-secondary dark:text-text-secondary">{projectType.label}</Label>
                </div>
              ))}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">{errors.projectTypes}</TooltipContent>
        </Tooltip>
      </div>

      <div>
        <Label className="mb-2 block text-text-primary dark:text-slate-200">{t("form.current_situation")}</Label>
        <Tooltip open={!!errors.currentSituation && touched.currentSituation}>
          <TooltipTrigger asChild>
            <Textarea
              value={formData.currentSituation}
              onChange={(e) => updateFormData("currentSituation", e.target.value)}
              onBlur={() => handleBlur("currentSituation")}
              placeholder={t("form.placeholder_current_situation")}
              className={`min-h-[100px] resize-none border-border-default focus:border-focus focus:ring-focus dark:border-border-default dark:bg-surface-elevated/60 dark:text-slate-100 dark:placeholder:text-text-muted ${
                errors.currentSituation && touched.currentSituation ? "border-red-500" : ""
              }`}
            />
          </TooltipTrigger>
          <TooltipContent side="right">{errors.currentSituation}</TooltipContent>
        </Tooltip>
      </div>

      <div>
        <Label className="mb-2 block text-text-primary dark:text-slate-200">{t("form.project_goals")}</Label>
        <Tooltip open={!!errors.projectGoals && touched.projectGoals}>
          <TooltipTrigger asChild>
            <Textarea
              value={formData.projectGoals}
              onChange={(e) => updateFormData("projectGoals", e.target.value)}
              onBlur={() => handleBlur("projectGoals")}
              placeholder={t("form.placeholder_project_goals")}
              className={`min-h-[100px] resize-none border-border-default focus:border-focus focus:ring-focus dark:border-border-default dark:bg-surface-elevated/60 dark:text-slate-100 dark:placeholder:text-text-muted ${
                errors.projectGoals && touched.projectGoals ? "border-red-500" : ""
              }`}
            />
          </TooltipTrigger>
          <TooltipContent side="right">{errors.projectGoals}</TooltipContent>
        </Tooltip>
      </div>

      <div>
        <Label className="mb-2 block text-text-primary dark:text-slate-200">{t("form.target_audience")}</Label>
        <Input
          value={formData.targetAudience}
          onChange={(e) => updateFormData("targetAudience", e.target.value)}
          placeholder={t("form.placeholder_target_audience")}
          className="border-border-default focus:border-focus focus:ring-focus dark:border-border-default dark:bg-surface-elevated/60 dark:text-slate-100 dark:placeholder:text-text-muted"
        />
      </div>
    </div>
  );
}
