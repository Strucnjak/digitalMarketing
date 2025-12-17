import { toast } from "sonner";
import { logAuditEvent } from "./audit";
import type { ContactMessage, Consultation, ServiceInquiry } from "../types/admin";

const API_BASE = import.meta.env.VITE_ADMIN_API_BASE ?? "/api/admin";

interface FetchOptions {
  apiKey: string | null;
  signal?: AbortSignal;
}

async function handleResponse(response: Response, path: string) {
  if (response.status === 401) {
    toast.error("Session expired / invalid key");
    const returnTo = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/login?returnTo=${returnTo}`;
    throw new Error("Unauthorized");
  }
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed for ${path}`);
  }
  return response.json();
}

async function apiFetch<T>(path: string, options: FetchOptions): Promise<T> {
  if (!options.apiKey) {
    throw new Error("Missing API key");
  }
  const response = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": options.apiKey,
    },
    signal: options.signal,
  });
  return handleResponse(response, path);
}

export async function getDatabaseStatus(apiKey: string) {
  const result = await apiFetch<{ status: string; message?: string }>("/database-status", { apiKey });
  logAuditEvent("health_check", { status: result.status, message: result.message });
  return result;
}

export const getContactMessages = (apiKey: string, signal?: AbortSignal) =>
  apiFetch<ContactMessage[]>("/contact-messages", { apiKey, signal });

export const getConsultations = (apiKey: string, signal?: AbortSignal) =>
  apiFetch<Consultation[]>("/consultations", { apiKey, signal });

export const getServiceInquiries = (apiKey: string, signal?: AbortSignal) =>
  apiFetch<ServiceInquiry[]>("/service-inquiries", { apiKey, signal });
