import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle, Building, Globe, Mail, Phone, User } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import type { InquiryFormData } from '../ServiceInquiryForm';

interface Step1Props {
  formData: InquiryFormData;
  errors: Record<string, string>;
  updateFormData: (field: keyof InquiryFormData, value: unknown) => void;
}

export function Step1({ formData, errors, updateFormData }: Step1Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
            <User className="h-4 w-4" />
            {t('form.full_name')}
          </Label>
          <Input
            value={formData.fullName}
            onChange={e => updateFormData('fullName', e.target.value)}
            placeholder={t('form.placeholder_full_name')}
            className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan ${errors.fullName ? 'border-red-500' : ''}`}
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
            {t('form.email')}
          </Label>
          <Input
            type="email"
            value={formData.email}
            onChange={e => updateFormData('email', e.target.value)}
            placeholder={t('form.placeholder_email')}
            className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan ${errors.email ? 'border-red-500' : ''}`}
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
          <Input
            value={formData.company}
            onChange={e => updateFormData('company', e.target.value)}
            placeholder={t('form.placeholder_company')}
            className={`border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan ${errors.company ? 'border-red-500' : ''}`}
          />
          {errors.company && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.company}
            </div>
          )}
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
