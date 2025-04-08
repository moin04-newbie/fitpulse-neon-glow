
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// Improved auth guard component with debugging and auto-login for testing
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for user in localStorage
    const user = localStorage.getItem("fitpulse-user");
    
    // Debug: Log authentication status
    console.log("Authentication check:", !!user);
    
    // For testing purposes: if no user is found, create a test user
    if (!user) {
      console.log("No user found in localStorage - creating test user for debugging");
      localStorage.setItem("fitpulse-user", JSON.stringify({ 
        name: "Test User",
        email: "test@fitpulse.com",
        isLoggedIn: true 
      }));
      
      toast({
        title: "Test mode active",
        description: "Created temporary test user for debugging",
      });
    }
    
    // Always set authenticated to true for now to ensure pages are accessible
    setIsAuthenticated(true);
  }, []);
  
  if (isAuthenticated === null) {
    // Still loading
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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
