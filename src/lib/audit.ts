export type AuditEventType =
  | "login_success"
  | "health_check"
  | "table_filter_change"
  | "export_csv"
  | "detail_open";

export interface AuditEvent<TPayload = Record<string, unknown>> {
  id: string;
  timestamp: string;
  type: AuditEventType;
  payload: TPayload;
  userAgent: string;
}

const STORAGE_KEY = "admin_audit_log";

function readLog(): AuditEvent[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuditEvent[]) : [];
  } catch {
    return [];
  }
}

function writeLog(entries: AuditEvent[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-500)));
}

export function logAuditEvent<TPayload>(type: AuditEventType, payload: TPayload) {
  const next: AuditEvent = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    type,
    payload: payload as Record<string, unknown>,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "server",
  };
  const log = readLog();
  log.push(next);
  writeLog(log);
  return next;
}

export function getAuditLog() {
  return readLog().sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function clearAuditLog() {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
