import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./components/ThemeProvider";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ReduxProvider from "./redux/provider";
import { StatusBar, Style } from "@capacitor/status-bar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NextUIProvider>
        <Router>
          <QueryClientProvider client={queryClient}>
            <Auth0ProviderWithNavigate>
              <ReduxProvider>
                <div>
                  <AppRoutes />
                </div>
                <Toaster visibleToasts={1} position="top-center" richColors />
              </ReduxProvider>
            </Auth0ProviderWithNavigate>
          </QueryClientProvider>
        </Router>
      </NextUIProvider>
    </ThemeProvider>
  </React.StrictMode>
);
