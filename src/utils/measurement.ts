export type CommercialEventName =
  | "contact_submission_success"
  | "consultation_submission_success"
  | "service_inquiry_submission_success"
  | "consultation_cta_click"
  | "email_click"
  | "phone_click";

export interface CommercialEventDetail {
  event: CommercialEventName;
  locale?: string;
}

/** Vendor-neutral event boundary. No form values or other PII are accepted. */
export function emitCommercialEvent(detail: CommercialEventDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<CommercialEventDetail>("dial:commercial-event", { detail }));
}
