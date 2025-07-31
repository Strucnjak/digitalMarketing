import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { AlertCircle, MessageSquare } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import type { InquiryFormData } from '../ServiceInquiryForm';

interface Step4Props {
  formData: InquiryFormData;
  errors: Record<string, string>;
  updateFormData: (field: keyof InquiryFormData, value: unknown) => void;
}

export function Step4({ formData, errors, updateFormData }: Step4Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block text-bdigital-navy">
          {t('form.preferred_contact_label')}
        </Label>
        <RadioGroup
          value={formData.preferredContact}
          onValueChange={value => updateFormData('preferredContact', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" />
            <Label className="text-neutral-gray">{t('form.contact_option.email')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" />
            <Label className="text-neutral-gray">{t('form.contact_option.phone')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="whatsapp" />
            <Label className="text-neutral-gray">{t('form.contact_option.whatsapp')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="meeting" />
            <Label className="text-neutral-gray">{t('form.contact_option.meeting')}</Label>
          </div>
        </RadioGroup>
        {errors.preferredContact && (
          <div className="flex items-center mt-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.preferredContact}
          </div>
        )}
      </div>

      <div>
        <Label className="mb-2 block text-bdigital-navy">
          {t('form.how_hear_label')}
        </Label>
        <Select value={formData.howDidYouHear} onValueChange={value => updateFormData('howDidYouHear', value)}>
          <SelectTrigger className="border-gray-300 focus:border-bdigital-cyan">
            <SelectValue placeholder={t('form.placeholder_how_hear')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">{t('form.how_hear_option.google')}</SelectItem>
            <SelectItem value="social-media">{t('form.how_hear_option.social_media')}</SelectItem>
            <SelectItem value="referral">{t('form.how_hear_option.referral')}</SelectItem>
            <SelectItem value="advertisement">{t('form.how_hear_option.advertisement')}</SelectItem>
            <SelectItem value="website">{t('form.how_hear_option.website')}</SelectItem>
            <SelectItem value="other">{t('form.how_hear_option.other')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="flex items-center gap-2 mb-2 text-bdigital-navy">
          <MessageSquare className="h-4 w-4" />
          {t('form.additional_info_label')}
        </Label>
        <Textarea
          value={formData.additionalInfo}
          onChange={e => updateFormData('additionalInfo', e.target.value)}
          placeholder={t('form.placeholder_additional_info')}
          className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan min-h-[100px] resize-none"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          checked={formData.newsletter}
          onCheckedChange={checked => updateFormData('newsletter', checked)}
          className="border-gray-300"
        />
        <Label className="text-sm font-normal text-neutral-gray">
          {t('form.newsletter_label')}
        </Label>
      </div>
    </div>
  );
}
