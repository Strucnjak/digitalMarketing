import { createContext, useContext } from "react";

export interface ApiKeyContextValue {
  apiKey: string | null;
  isRemembered: boolean;
  setApiKey: (key: string, remember: boolean) => void;
  clearApiKey: () => void;
}

export const ApiKeyContext = createContext<ApiKeyContextValue | undefined>(undefined);
export const STORAGE_KEY = "admin_api_key";

export function useApiKey() {
  const ctx = useContext(ApiKeyContext);
  if (!ctx) throw new Error("ApiKeyProvider missing");
  return ctx;
}
