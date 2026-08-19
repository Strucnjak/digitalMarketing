const REQUEST_TIMEOUT_MS = 15_000;

export class LeadSubmissionError extends Error {
  constructor() {
    super("Lead submission failed");
    this.name = "LeadSubmissionError";
  }
}

function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (!configuredUrl) {
    throw new LeadSubmissionError();
  }

  return configuredUrl.replace(/\/+$/, "");
}

export async function submitLead(
  endpoint: `/${string}`,
  payload: Record<string, unknown>,
): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${getApiBaseUrl()}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new LeadSubmissionError();
    }
  } catch (error) {
    if (error instanceof LeadSubmissionError) throw error;
    throw new LeadSubmissionError();
  } finally {
    clearTimeout(timeout);
  }
}
