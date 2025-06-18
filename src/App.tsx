
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ToastProvider } from "@/components/toast/toast-provider";
import OnboardingTour from "./components/onboarding/OnboardingTour";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import CourseAccessGuard from "./components/auth/CourseAccessGuard";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCertificatesPage from "./pages/admin/certificates";
import CertificateViewer from "./pages/certificates/[id]";
import CertificatePage from "./pages/CertificatePage";
import CertificatePreview from "./pages/CertificatePreview";
import SignatureManagement from "./pages/SignatureManagement";
import CourseManagement from "./pages/CourseManagement";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Extras from "./pages/Extras";
import HelpCenter from "./pages/HelpCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToastProvider>
        <BrowserRouter>
          <AuthProvider>
            <OnboardingTour />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/help" element={<HelpCenter />} />
              
              {/* Protected Routes - Require Authentication */}
              <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
              <Route path="/courses/:courseId" element={
                <ProtectedRoute>
                  <CourseAccessGuard>
                    <CourseDetail />
                  </CourseAccessGuard>
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/certificates" element={
                <ProtectedRoute adminOnly>
                  <AdminCertificatesPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/courses" element={<ProtectedRoute><CourseManagement /></ProtectedRoute>} />
              <Route path="/admin/signatures" element={<ProtectedRoute><SignatureManagement /></ProtectedRoute>} />
              <Route path="/certificates/:certificateId" element={<ProtectedRoute><CertificatePage /></ProtectedRoute>} />
              <Route path="/certificates/:id" element={
                <ProtectedRoute>
                  <CertificateViewer />
                </ProtectedRoute>
              } />
              <Route path="/certificate-preview" element={
                <ProtectedRoute>
                  <CertificatePreview />
                </ProtectedRoute>
              } />
              <Route path="/extras" element={<ProtectedRoute><Extras /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </ToastProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
