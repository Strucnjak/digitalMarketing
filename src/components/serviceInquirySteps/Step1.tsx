import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Building, Globe, Mail, Phone, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useLanguage } from '../LanguageContext';
import type { InquiryFormData } from '../ServiceInquiryForm';

interface Step1Props {
  formData: InquiryFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  updateFormData: (field: keyof InquiryFormData, value: unknown) => void;
  handleBlur: (field: keyof InquiryFormData) => void;
}

export function Step1({
  formData,
  errors,
  touched,
  updateFormData,
  handleBlur
}: Step1Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
            <User className="h-4 w-4" />
            {t('form.full_name')}
          </Label>
          <Tooltip open={!!errors.fullName && touched.fullName}>
            <TooltipTrigger asChild>
              <Input
                value={formData.fullName}
                onChange={e => updateFormData('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                placeholder={t('form.placeholder_full_name')}
                className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan ${errors.fullName && touched.fullName ? 'border-red-500' : ''}`}
              />
            </TooltipTrigger>
            <TooltipContent side="right">{errors.fullName}</TooltipContent>
          </Tooltip>
        </div>
        <div>
          <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
            <Mail className="h-4 w-4" />
            {t('form.email')}
          </Label>
          <Tooltip open={!!errors.email && touched.email}>
            <TooltipTrigger asChild>
              <Input
                type="email"
                value={formData.email}
                onChange={e => updateFormData('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder={t('form.placeholder_email')}
                className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan ${errors.email && touched.email ? 'border-red-500' : ''}`}
              />
            </TooltipTrigger>
            <TooltipContent side="right">{errors.email}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
            <Phone className="h-4 w-4" />
            {t('form.phone')}
          </Label>
          <Input
            value={formData.phone}
            onChange={e => updateFormData('phone', e.target.value)}
            placeholder={t('form.placeholder_phone')}
            className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan"
          />
        </div>
        <div>
          <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
            <Building className="h-4 w-4" />
            {t('form.company')}
          </Label>
          <Tooltip open={!!errors.company && touched.company}>
            <TooltipTrigger asChild>
              <Input
                value={formData.company}
                onChange={e => updateFormData('company', e.target.value)}
                onBlur={() => handleBlur('company')}
                placeholder={t('form.placeholder_company')}
                className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan ${errors.company && touched.company ? 'border-red-500' : ''}`}
              />
            </TooltipTrigger>
            <TooltipContent side="right">{errors.company}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div>
        <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
          <Globe className="h-4 w-4" />
          {t('form.website')}
        </Label>
        <Input
          value={formData.website}
          onChange={e => updateFormData('website', e.target.value)}
          placeholder={t('form.placeholder_website')}
          className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan"
        />
      </div>
    </div>
  );
}
