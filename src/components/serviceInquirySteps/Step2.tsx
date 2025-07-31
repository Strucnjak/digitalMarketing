import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import type { InquiryFormData } from '../ServiceInquiryForm';

interface Step2Props {
  formData: InquiryFormData;
  errors: Record<string, string>;
  updateFormData: (field: keyof InquiryFormData, value: unknown) => void;
  handleProjectTypeChange: (projectType: string, checked: boolean) => void;
}

export function Step2({
  formData,
  errors,
  updateFormData,
  handleProjectTypeChange
}: Step2Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block text-bdigital-navy">
          {t('form.project_types_label')}
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: 'new-website', label: t('form.project_type.new_website') },
            { value: 'redesign', label: t('form.project_type.redesign') },
            { value: 'ecommerce', label: t('form.project_type.ecommerce') },
            { value: 'mobile-app', label: t('form.project_type.mobile_app') },
            { value: 'seo-optimization', label: t('form.project_type.seo_optimization') },
            { value: 'social-media', label: t('form.project_type.social_media') },
            { value: 'branding', label: t('form.project_type.branding') },
            { value: 'marketing-strategy', label: t('form.project_type.marketing_strategy') },
            { value: 'other', label: t('form.project_type.other') }
          ].map(projectType => (
            <div key={projectType.value} className="flex items-center space-x-2">
              <Checkbox
                checked={formData.projectTypes.includes(projectType.value)}
                onCheckedChange={checked =>
                  handleProjectTypeChange(projectType.value, checked as boolean)
                }
                className="border-gray-300"
              />
              <Label className="text-sm font-normal text-neutral-gray">
                {projectType.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.projectTypes && (
          <div className="flex items-center mt-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.projectTypes}
          </div>
        )}
      </div>

      <div>
        <Label className="mb-2 block text-bdigital-navy">
          {t('form.current_situation')}
        </Label>
        <Textarea
          value={formData.currentSituation}
          onChange={e => updateFormData('currentSituation', e.target.value)}
          placeholder={t('form.placeholder_current_situation')}
          className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan min-h-[100px] resize-none ${errors.currentSituation ? 'border-red-500' : ''}`}
        />
        {errors.currentSituation && (
          <div className="flex items-center mt-1 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.currentSituation}
          </div>
        )}
      </div>

      <div>
        <Label className="mb-2 block text-bdigital-navy">
          {t('form.project_goals')}
        </Label>
        <Textarea
          value={formData.projectGoals}
          onChange={e => updateFormData('projectGoals', e.target.value)}
          placeholder={t('form.placeholder_project_goals')}
          className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan min-h-[100px] resize-none ${errors.projectGoals ? 'border-red-500' : ''}`}
        />
        {errors.projectGoals && (
          <div className="flex items-center mt-1 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.projectGoals}
          </div>
        )}
      </div>

      <div>
        <Label className="mb-2 block text-bdigital-navy">
          {t('form.target_audience')}
        </Label>
        <Input
          value={formData.targetAudience}
          onChange={e => updateFormData('targetAudience', e.target.value)}
          placeholder={t('form.placeholder_target_audience')}
          className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan"
        />
      </div>
    </div>
  );
}
