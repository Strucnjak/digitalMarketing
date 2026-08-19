const STORAGE_KEY = "dial:first-touch-attribution";

export const UTM_PARAMETERS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export interface FirstTouchAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page: string;
  referrer?: string;
}

export function captureFirstTouchAttribution(): FirstTouchAttribution | null {
  if (typeof window === "undefined") return null;

  const existing = getFirstTouchAttribution();
  if (existing) return existing;

  const query = new URLSearchParams(window.location.search);
  const attribution: FirstTouchAttribution = {
    landing_page: `${window.location.pathname}${window.location.search}`,
  };

  for (const parameter of UTM_PARAMETERS) {
    const value = query.get(parameter)?.trim();
    if (value) attribution[parameter] = value.slice(0, 500);
  }
  if (document.referrer) attribution.referrer = document.referrer.slice(0, 1000);

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    return attribution;
  }
  return attribution;
}

export function getFirstTouchAttribution(): FirstTouchAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as FirstTouchAttribution;
    return typeof parsed.landing_page === "string" ? parsed : null;
  } catch {
    return null;
  }
}
