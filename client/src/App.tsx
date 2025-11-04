import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DataProvider } from "./contexts/DataContext";
import { Layout } from "./components/Layout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Friends from "./pages/Friends";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import VerifyEmailPage from "./components/VerifyEmailPage";
import RegistrationSuccess from "./components/RegistrationSuccess";
import { useError } from "./contexts/ErrorContext";
import { registerErrorHandler } from "./lib/utils";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" state={{ from: window.location.pathname }} replace/>;
};

const App = () => {
  const { showError } = useError()
 
  registerErrorHandler(showError);

  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-right" />
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/verify-email" element={<VerifyEmailPage/>} />
                <Route path="/auth/register/success" element={<RegistrationSuccess/>} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="friends" element={<Friends />} />
                  <Route path="accounts" element={<Accounts />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
)};

export default App;
