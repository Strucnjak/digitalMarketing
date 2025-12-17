import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AppLayout } from "./components/admin/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { ContactMessagesPage } from "./pages/ContactMessagesPage";
import { ConsultationsPage } from "./pages/ConsultationsPage";
import { ServiceInquiriesPage } from "./pages/ServiceInquiriesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { LoginPage } from "./pages/LoginPage";
import { useApiKey } from "./providers/ApiKeyProvider";

function RequireAuth() {
  const { apiKey } = useApiKey();
  const location = useLocation();
  if (!apiKey) {
    return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }
  return <Outlet />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/contact-messages" element={<ContactMessagesPage />} />
          <Route path="/consultations" element={<ConsultationsPage />} />
          <Route path="/service-inquiries" element={<ServiceInquiriesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export async function preloadRouteComponents() {
  return Promise.resolve();
}
