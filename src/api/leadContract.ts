export const LEAD_LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  company: 160,
  url: 2048,
  selection: 160,
  arrayItem: 120,
  longText: 5000,
  array: 20,
} as const;

export const LANGUAGES = ["me", "en", "fr"] as const;
export type LeadLanguage = (typeof LANGUAGES)[number];
export type BusinessType = "startup" | "small_business" | "medium_business" | "large_business" | "freelancer" | "agency" | "non_profit" | "other";
export type ConsultationService = "web" | "seo" | "social" | "branding" | "strategy";
export type ConsultationContact = "phone" | "whatsapp" | "video" | "meeting";
export type PreferredTime = "" | "morning" | "afternoon" | "evening" | "flexible";
export type InquiryTimeline = "asap" | "1-month" | "2-3-months" | "3-6-months" | "flexible";
export type InquiryBudget = "under-1000" | "1000-2500" | "2500-5000" | "5000-10000" | "over-10000" | "discuss";
export type InquiryContact = "email" | "phone" | "whatsapp" | "meeting";
export type ReferralSource = "" | "google" | "social-media" | "referral" | "advertisement" | "website" | "other";

export interface ContactRequest { name: string; email: string; message: string; language: LeadLanguage; company?: string; phone?: string }
export interface ConsultationRequest { fullName: string; email: string; company: string; businessType: BusinessType; currentChallenges: string; goals: string; interestedServices: ConsultationService[]; preferredContact: ConsultationContact; language: LeadLanguage; phone?: string; website?: string; preferredTime?: PreferredTime; additionalInfo?: string; newsletter: boolean }
export interface ServiceInquiryRequest { fullName: string; email: string; company: string; projectTypes: string[]; currentSituation: string; projectGoals: string; timeline: InquiryTimeline; budget: InquiryBudget; preferredContact: InquiryContact; language: LeadLanguage; phone?: string; website?: string; selectedService?: string; selectedPackage?: string; targetAudience?: string; additionalServices?: string[]; additionalInfo?: string; howDidYouHear?: ReferralSource; newsletter: boolean }
export type LeadRequest = ContactRequest | ConsultationRequest | ServiceInquiryRequest;

export class LeadContractError extends Error {
  constructor(public fields: Record<string, string>) { super("Invalid lead request"); }
}
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const absoluteHttpUrl = (value: string) => { try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; } };
const oneOf = <T extends string>(value: string, values: readonly T[]): value is T => values.includes(value as T);
const clean = (value: unknown) => typeof value === "string" ? value.trim() : "";
const checkString = (fields: Record<string, string>, key: string, value: string, max: number, required = false) => {
  if (required && !value) fields[key] = "required";
  else if (value.length > max) fields[key] = "too_long";
};
const checkArray = (fields: Record<string, string>, key: string, value: unknown, required: boolean) => {
  if (!Array.isArray(value) || (required && value.length === 0)) { fields[key] = "required"; return []; }
  if (value.length > LEAD_LIMITS.array || value.some((item) => typeof item !== "string" || !item.trim() || item.trim().length > LEAD_LIMITS.arrayItem)) fields[key] = "invalid";
  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim());
};
const finish = <T>(fields: Record<string, string>, request: T): T => { if (Object.keys(fields).length) throw new LeadContractError(fields); return request; };
const checkEmail = (fields: Record<string, string>, email: string) => { checkString(fields, "email", email, LEAD_LIMITS.email, true); if (email && !emailPattern.test(email)) fields.email = "invalid"; };
const checkLanguage = (fields: Record<string, string>, language: unknown): LeadLanguage => { if (!oneOf(String(language), LANGUAGES)) fields.language = "invalid"; return language as LeadLanguage; };

export function buildContactRequest(input: Record<string, unknown>): ContactRequest {
  const fields: Record<string, string> = {}, name = clean(input.name), email = clean(input.email), message = clean(input.message), company = clean(input.company), phone = clean(input.phone);
  checkString(fields, "name", name, LEAD_LIMITS.name, true); checkEmail(fields, email); checkString(fields, "message", message, LEAD_LIMITS.longText, true); checkString(fields, "company", company, LEAD_LIMITS.company); checkString(fields, "phone", phone, LEAD_LIMITS.phone);
  return finish(fields, { name, email, message, company, phone, language: checkLanguage(fields, input.language) });
}

export function buildConsultationRequest(input: Record<string, unknown>): ConsultationRequest {
  const fields: Record<string, string> = {};
  const text = Object.fromEntries(["fullName", "email", "phone", "company", "website", "currentChallenges", "goals", "additionalInfo"].map(k => [k, clean(input[k])])) as Record<string, string>;
  checkString(fields,"fullName",text.fullName,120,true); checkEmail(fields,text.email); checkString(fields,"phone",text.phone,40); checkString(fields,"company",text.company,160,true); checkString(fields,"website",text.website,2048); if (text.website && !absoluteHttpUrl(text.website)) fields.website="invalid"; checkString(fields,"currentChallenges",text.currentChallenges,5000,true); checkString(fields,"goals",text.goals,5000,true); checkString(fields,"additionalInfo",text.additionalInfo,5000);
  const business = String(input.businessType), contact = String(input.preferredContact), time = clean(input.preferredTime), services = checkArray(fields,"interestedServices",input.interestedServices,true);
  if (!oneOf(business,["startup","small_business","medium_business","large_business","freelancer","agency","non_profit","other"] as const)) fields.businessType="invalid";
  if (!services.every(v=>oneOf(v,["web","seo","social","branding","strategy"] as const))) fields.interestedServices="invalid";
  if (!oneOf(contact,["phone","whatsapp","video","meeting"] as const)) fields.preferredContact="invalid";
  if (!oneOf(time,["","morning","afternoon","evening","flexible"] as const)) fields.preferredTime="invalid";
  if (typeof input.newsletter !== "boolean") fields.newsletter="invalid";
  return finish(fields,{...text, fullName:text.fullName,email:text.email,company:text.company,currentChallenges:text.currentChallenges,goals:text.goals,businessType:business as BusinessType,interestedServices:services as ConsultationService[],preferredContact:contact as ConsultationContact,preferredTime:time as PreferredTime,newsletter:input.newsletter as boolean,language:checkLanguage(fields,input.language)});
}

export function buildServiceInquiryRequest(input: Record<string, unknown>): ServiceInquiryRequest {
  const fields: Record<string, string> = {};
  const text = Object.fromEntries(["fullName","email","phone","company","website","selectedService","selectedPackage","currentSituation","projectGoals","targetAudience","additionalInfo"].map(k=>[k,clean(input[k])])) as Record<string,string>;
  checkString(fields,"fullName",text.fullName,120,true); checkEmail(fields,text.email); checkString(fields,"phone",text.phone,40); checkString(fields,"company",text.company,160,true); checkString(fields,"website",text.website,2048); if(text.website&&!absoluteHttpUrl(text.website)) fields.website="invalid"; for(const k of ["selectedService","selectedPackage"] ) checkString(fields,k,text[k],160); for(const k of ["currentSituation","projectGoals"]) checkString(fields,k,text[k],5000,true); for(const k of ["targetAudience","additionalInfo"]) checkString(fields,k,text[k],5000);
  const projectTypes=checkArray(fields,"projectTypes",input.projectTypes,true), additionalServices=checkArray(fields,"additionalServices",input.additionalServices??[],false); const timeline=String(input.timeline),budget=String(input.budget),contact=String(input.preferredContact),heard=clean(input.howDidYouHear);
  if(!oneOf(timeline,["asap","1-month","2-3-months","3-6-months","flexible"] as const)) fields.timeline="invalid"; if(!oneOf(budget,["under-1000","1000-2500","2500-5000","5000-10000","over-10000","discuss"] as const)) fields.budget="invalid"; if(!oneOf(contact,["email","phone","whatsapp","meeting"] as const)) fields.preferredContact="invalid"; if(!oneOf(heard,["","google","social-media","referral","advertisement","website","other"] as const)) fields.howDidYouHear="invalid"; if(typeof input.newsletter!=="boolean") fields.newsletter="invalid";
  return finish(fields,{...text,fullName:text.fullName,email:text.email,company:text.company,projectTypes,currentSituation:text.currentSituation,projectGoals:text.projectGoals,timeline:timeline as InquiryTimeline,budget:budget as InquiryBudget,additionalServices,preferredContact:contact as InquiryContact,howDidYouHear:heard as ReferralSource,newsletter:input.newsletter as boolean,language:checkLanguage(fields,input.language)});
}
