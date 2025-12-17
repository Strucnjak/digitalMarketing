import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import { ApiKeyProvider } from "./providers/ApiKeyProvider";
import { AppRoutes } from "./routes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiKeyProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster richColors />
        </BrowserRouter>
      </ApiKeyProvider>
    </QueryClientProvider>
  );
}
