import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { defaultLocale, isLocale } from "./routing";
import { AdminDataProvider } from "./components/AdminDataContext";
import { InitialStateProvider, type InitialAppState } from "./components/InitialStateContext";
import "./index.css";

declare global {
  interface Window {
    __INITIAL_STATE__?: InitialAppState;
  }
}

const container = document.getElementById("root");

if (container) {
  const initialStateFromServer: InitialAppState | undefined = window.__INITIAL_STATE__;
  const fallbackInitialState: InitialAppState = {
    locale: initialStateFromServer?.locale ?? defaultLocale,
    footerYear: initialStateFromServer?.footerYear ?? new Date().getFullYear(),
  };
  const initialState: InitialAppState = initialStateFromServer ?? fallbackInitialState;
  if (!initialStateFromServer) {
    window.__INITIAL_STATE__ = initialState;
  }

  const initialLocale = initialState.locale;
  const storageKey = "language";

  if (typeof window !== "undefined") {
    let storedLocale: string | null = null;

    try {
      storedLocale = window.localStorage.getItem(storageKey);
    } catch (error) {
      console.warn("Unable to read persisted language", error);
    }

    if (!isLocale(storedLocale)) {
      if (initialLocale) {
        try {
          window.localStorage.setItem(storageKey, initialLocale);
        } catch (error) {
          console.warn("Unable to persist initial language", error);
        }
      } else {
        try {
          window.localStorage.setItem(storageKey, defaultLocale);
        } catch (error) {
          console.warn("Unable to persist default language", error);
        }
      }
    }
  }

  hydrateRoot(
    container,
    <StrictMode>
      <InitialStateProvider value={initialState}>
        <BrowserRouter>
          <AdminDataProvider>
            <AppRoutes />
          </AdminDataProvider>
        </BrowserRouter>
      </InitialStateProvider>
    </StrictMode>
  );
}
