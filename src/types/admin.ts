export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  createdAt: string;
}

export interface Consultation {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  businessType?: string;
  preferredContact?: string;
  preferredTime?: string;
  interestedServices?: string;
  newsletter?: boolean;
  goals?: string;
  challenges?: string;
  additionalInfo?: string;
  createdAt: string;
}

export interface ServiceInquiry {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  selectedService?: string;
  selectedPackage?: string;
  projectTypes?: string[] | string;
  additionalServices?: string[] | string;
  budget?: string;
  timeline?: string;
  newsletter?: boolean;
  currentSituation?: string;
  projectGoals?: string;
  targetAudience?: string;
  additionalInfo?: string;
  howDidYouHear?: string;
  createdAt: string;
}
