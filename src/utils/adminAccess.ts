export const ADMIN_ACCESS_STORAGE_KEY = "bdigital-admin-access";

export function persistAdminAccess() {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(ADMIN_ACCESS_STORAGE_KEY, "true");
}

export function hasAdminAccess(): boolean {
  if (typeof window === "undefined") return false;

  return window.sessionStorage.getItem(ADMIN_ACCESS_STORAGE_KEY) === "true";
}

export function clearAdminAccess() {
  if (typeof window === "undefined") return;

  window.sessionStorage.removeItem(ADMIN_ACCESS_STORAGE_KEY);
}
