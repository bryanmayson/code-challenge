import { Suspense } from "react";
import { AppRouteEnum, AppRoutes } from "./routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundaryDisplay } from "./_components/ErrorBoundaryDisplay";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";
import { SitePage } from "./_components/SitePage";
import { LoadingDisplay } from "./_components/LoadingDisplay";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryDisplay />}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoadingDisplay />}>
            <SiteHeader />
            <SitePage>
              <Routes>
                {AppRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                  />
                ))}
                <Route
                  path='*'
                  element={<Navigate to={AppRouteEnum.LANDING} replace />}
                />
              </Routes>
            </SitePage>
            <SiteFooter />
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
