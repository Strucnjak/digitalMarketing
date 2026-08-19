const REQUEST_TIMEOUT_MS = 15_000;

export type LeadFailureKind = "validation" | "rate_limit" | "server" | "timeout" | "network" | "configuration";
export class LeadSubmissionError extends Error {
  kind: LeadFailureKind;
  fields: Record<string, string>;

  constructor(kind: LeadFailureKind, fields: Record<string, string> = {}) {
    super("Lead submission failed");
    this.name = "LeadSubmissionError";
    this.kind = kind;
    this.fields = fields;
  }
}

export function leadErrorTranslationKey(error: unknown): string {
  if (!(error instanceof LeadSubmissionError)) return "lead.error.generic";
  return `lead.error.${error.kind}`;
}

function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (!configuredUrl) {
    throw new LeadSubmissionError("configuration");
  }

  return configuredUrl.replace(/\/+$/, "");
}

export async function submitLead(
  endpoint: `/${string}`,
  payload: object,
): Promise<void> {
  return submitLeadTo(getApiBaseUrl(), endpoint, payload);
}

export async function submitLeadTo(
  apiBaseUrl: string,
  endpoint: `/${string}`,
  payload: object,
  timeoutMs = REQUEST_TIMEOUT_MS,
): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${apiBaseUrl.trim().replace(/\/+$/, "")}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      let fields: Record<string, string> = {};
      if (response.status === 422) {
        try { const body = await response.json() as { error?: { fields?: Record<string, string> } }; fields = body.error?.fields ?? {}; } catch { /* malformed error bodies remain safe and generic */ }
        throw new LeadSubmissionError("validation", fields);
      }
      if (response.status === 429) throw new LeadSubmissionError("rate_limit");
      throw new LeadSubmissionError("server");
    }
  } catch (error) {
    if (error instanceof LeadSubmissionError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") throw new LeadSubmissionError("timeout");
    throw new LeadSubmissionError("network");
  } finally {
    clearTimeout(timeout);
  }
}
