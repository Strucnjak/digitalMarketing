import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar, DollarSign } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useLanguage } from '../LanguageContext';
import type { InquiryFormData } from '../ServiceInquiryForm';

interface Step3Props {
  formData: InquiryFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  updateFormData: (field: keyof InquiryFormData, value: unknown) => void;
  handleAdditionalServicesChange: (service: string, checked: boolean) => void;
  handleBlur: (field: keyof InquiryFormData) => void;
}

export function Step3({
  formData,
  errors,
  touched,
  updateFormData,
  handleAdditionalServicesChange,
  handleBlur
}: Step3Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="relative z-20">
        <Label className="flex items-center gap-2 mb-3 text-bdigital-navy">
          <Calendar className="h-4 w-4" />
          {t('form.timeline')}
        </Label>
        <Tooltip open={!!errors.timeline && touched.timeline}>
          <TooltipTrigger asChild>
            <Select
              value={formData.timeline}
              onValueChange={value => updateFormData('timeline', value)}
            >
              <SelectTrigger
                onBlur={() => handleBlur('timeline')}
                className={`border-gray-300 focus:border-bdigital-cyan ${errors.timeline && touched.timeline ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder={t('form.placeholder_timeline')} />
              </SelectTrigger>
              <SelectContent forceMount>
                <SelectItem value="asap">{t('form.timeline_option.asap')}</SelectItem>
                <SelectItem value="1-month">{t('form.timeline_option.one_month')}</SelectItem>
                <SelectItem value="2-3-months">{t('form.timeline_option.two_three_months')}</SelectItem>
                <SelectItem value="3-6-months">{t('form.timeline_option.three_six_months')}</SelectItem>
                <SelectItem value="flexible">{t('form.timeline_option.flexible')}</SelectItem>
              </SelectContent>
            </Select>
          </TooltipTrigger>
          <TooltipContent side="right">{errors.timeline}</TooltipContent>
        </Tooltip>
      </div>

      <div className="relative z-20">
        <Label className="flex items-center gap-2 mb-3 text-bdigital-navy">
          <DollarSign className="h-4 w-4" />
          {t('form.budget')}
        </Label>
        <Tooltip open={!!errors.budget && touched.budget}>
          <TooltipTrigger asChild>
            <Select
              value={formData.budget}
              onValueChange={value => updateFormData('budget', value)}
            >
              <SelectTrigger
                onBlur={() => handleBlur('budget')}
                className={`border-gray-300 focus:border-bdigital-cyan ${errors.budget && touched.budget ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder={t('form.placeholder_budget')} />
              </SelectTrigger>
              <SelectContent forceMount>
                <SelectItem value="under-1000">{t('form.budget_option.under_1000')}</SelectItem>
                <SelectItem value="1000-2500">{t('form.budget_option.1000_2500')}</SelectItem>
                <SelectItem value="2500-5000">{t('form.budget_option.2500_5000')}</SelectItem>
                <SelectItem value="5000-10000">{t('form.budget_option.5000_10000')}</SelectItem>
                <SelectItem value="over-10000">{t('form.budget_option.over_10000')}</SelectItem>
                <SelectItem value="discuss">{t('form.budget_option.discuss')}</SelectItem>
              </SelectContent>
            </Select>
          </TooltipTrigger>
          <TooltipContent side="right">{errors.budget}</TooltipContent>
        </Tooltip>
      </div>

      <div>
        <Label className="mb-3 block text-bdigital-navy">
          {t('form.additional_services_label')}
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            t('form.additional_service.seo'),
            t('form.additional_service.social_media'),
            t('form.additional_service.google_ads'),
            t('form.additional_service.content'),
            t('form.additional_service.branding'),
            t('form.additional_service.email'),
            t('form.additional_service.analytics'),
            t('form.additional_service.support')
          ].map(service => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                checked={formData.additionalServices.includes(service)}
                onCheckedChange={checked =>
                  handleAdditionalServicesChange(service, checked as boolean)
                }
                className="border-gray-300"
              />
              <Label className="text-sm font-normal text-neutral-gray">
                {service}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
