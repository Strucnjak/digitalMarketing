import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "../routing";

export interface InitialAppState {
  locale?: Locale;
  footerYear?: number;
}

const InitialStateContext = createContext<InitialAppState | undefined>(undefined);

interface InitialStateProviderProps {
  value: InitialAppState | undefined;
  children: ReactNode;
}

export function InitialStateProvider({ value, children }: InitialStateProviderProps) {
  return <InitialStateContext.Provider value={value}>{children}</InitialStateContext.Provider>;
}

export function useInitialState() {
  return useContext(InitialStateContext);
}
