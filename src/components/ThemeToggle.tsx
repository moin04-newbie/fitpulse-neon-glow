
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full w-8 h-8 cursor-default"
    >
      <Moon className="h-4 w-4 text-foreground" />
      <span className="sr-only">Dark mode active</span>
    </Button>
  );
}
