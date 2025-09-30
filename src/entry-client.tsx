import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { defaultLocale, type Locale } from "./routing";
import "./index.css";

declare global {
  interface Window {
    __INITIAL_STATE__?: {
      locale?: Locale;
    };
  }
}

const container = document.getElementById("root");

if (container) {
  const initialLocale = window.__INITIAL_STATE__?.locale;
  if (initialLocale && typeof window !== "undefined") {
    try {
      window.localStorage.setItem("language", initialLocale);
    } catch (error) {
      console.warn("Unable to persist initial language", error);
    }
  } else if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem("language", defaultLocale);
    } catch (error) {
      console.warn("Unable to persist default language", error);
    }
  }

  hydrateRoot(
    container,
    <StrictMode>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </StrictMode>
  );
}
