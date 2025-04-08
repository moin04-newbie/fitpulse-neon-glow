
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-bold text-primary">404</h1>
        <h2 className="text-2xl font-medium mt-4 mb-6">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan transition-all duration-500">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
