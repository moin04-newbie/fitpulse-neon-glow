
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Set some mock user data in localStorage
      localStorage.setItem("fitpulse-user", JSON.stringify({ 
        name: "Alex Johnson",
        email: email,
        isLoggedIn: true 
      }));
      toast({
        title: "Logged in successfully!",
        description: "Welcome back to FitPulse",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 p-6 rounded-xl border border-border bg-card animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Timer className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold tracking-tight">
            Welcome to FitPulse
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:text-primary/90"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan transition-all duration-500"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:text-primary/90">
              Sign up
            </Link>
          </p>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>Demo credentials:</p>
          <p>Email: demo@fitpulse.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
}
