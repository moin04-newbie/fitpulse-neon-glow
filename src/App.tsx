
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Workouts from "./pages/Workouts";
import Hydration from "./pages/Hydration";
import Recovery from "./pages/Recovery";
import Calendar from "./pages/Calendar";
import Vitals from "./pages/Vitals";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const queryClient = new QueryClient();

// Improved auth guard component with debug mode removed for production
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for user in localStorage
    const user = localStorage.getItem("fitpulse-user");
    
    // Handle authentication state
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      toast({
        title: "Please log in",
        description: "You need to be logged in to view this page",
      });
    }
    
    setIsLoading(false);
  }, []);
  
  if (isLoading) {
    // Show loading indicator
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/workouts" 
              element={
                <ProtectedRoute>
                  <Workouts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hydration" 
              element={
                <ProtectedRoute>
                  <Hydration />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recovery" 
              element={
                <ProtectedRoute>
                  <Recovery />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/calendar" 
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/vitals" 
              element={
                <ProtectedRoute>
                  <Vitals />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
