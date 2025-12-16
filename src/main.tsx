import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AdminDataProvider } from "./components/AdminDataContext";
import { AppRoutes } from "./routes";
import "./index.css";

const container = document.getElementById("root");

if (container) {
  createRoot(container).render(
    <StrictMode>
      <BrowserRouter>
        <AdminDataProvider>
          <AppRoutes />
        </AdminDataProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
