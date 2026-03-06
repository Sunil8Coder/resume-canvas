import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { visitorService } from "@/services/visitorService";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import MyResumes from "./pages/MyResumes";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import CoverLetter from "./pages/CoverLetter";
import Blog from "./pages/Blog";
import BiodataFirstJob from "./pages/blog/BiodataFirstJob";
import ResumeFormatFreshersIndia2026 from "./pages/blog/ResumeFormatFreshersIndia2026";
import FreeResumeTemplatesSoftwareEngineers from "./pages/blog/FreeResumeTemplatesSoftwareEngineers";
import JavaDeveloperResumeGuide from "./pages/blog/JavaDeveloperResumeGuide";
import BiodataFormatMakerOnline from "./pages/blog/BiodataFormatMakerOnline";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    visitorService.logVisit();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ResumeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/oauth-success" element={<AuthCallback />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/my-resumes" element={<MyResumes />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cover-letter" element={<CoverLetter />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/how-to-make-biodata-for-first-job" element={<BiodataFirstJob />} />
                <Route path="/blog/best-resume-format-freshers-india-2026" element={<ResumeFormatFreshersIndia2026 />} />
                <Route path="/blog/free-resume-templates-software-engineers" element={<FreeResumeTemplatesSoftwareEngineers />} />
                <Route path="/blog/java-developer-resume-guide" element={<JavaDeveloperResumeGuide />} />
                <Route path="/blog/biodata-format-maker-online-guide" element={<BiodataFormatMakerOnline />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ResumeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
