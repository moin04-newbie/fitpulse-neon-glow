
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Dark Mode Active",
      description: "This app is designed to be used in dark mode only."
    });
    
    // Always set to dark theme
    setTheme("dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full w-8 h-8"
      onClick={handleClick}
    >
      <Moon className="h-4 w-4 text-foreground" />
      <span className="sr-only">Dark mode active</span>
    </Button>
  );
}
