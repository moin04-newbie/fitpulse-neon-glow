
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  CalendarDays, 
  Droplets, 
  Home, 
  Menu, 
  Moon, 
  Timer, 
  UserCircle, 
  Dumbbell, 
  Heart,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Workouts",
    href: "/workouts",
    icon: <Dumbbell className="w-5 h-5" />,
  },
  {
    title: "Hydration",
    href: "/hydration",
    icon: <Droplets className="w-5 h-5" />,
  },
  {
    title: "Recovery",
    href: "/recovery",
    icon: <Moon className="w-5 h-5" />,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: <CalendarDays className="w-5 h-5" />,
  },
  {
    title: "Vitals",
    href: "/vitals",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <UserCircle className="w-5 h-5" />,
  },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  
  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 h-full bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out z-40",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {expanded && (
          <div className="flex items-center gap-2">
            <Timer className="w-6 h-6 text-neon-cyan" />
            <span className="font-heading font-bold text-lg tracking-tight">FitPulse</span>
          </div>
        )}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-full hover:bg-sidebar-accent transition-colors"
        >
          {expanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <div className="mt-6 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center py-3 px-3 rounded-lg transition-colors hover:bg-sidebar-accent group",
                location.pathname === item.href ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground"
              )}
            >
              <div className="text-current">{item.icon}</div>
              {expanded && <span className="ml-3 font-medium">{item.title}</span>}
              {!expanded && (
                <div className="fixed left-16 py-2 px-3 ml-4 bg-background rounded-md shadow-md text-foreground text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {item.title}
                </div>
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className={cn(
        "absolute bottom-4 flex transition-all duration-300 ease-in-out",
        expanded ? "w-64 px-4 justify-between" : "w-16 justify-center"
      )}>
        <ThemeToggle />
        {expanded && <span className="text-xs text-muted-foreground">v1.0.0</span>}
      </div>
    </aside>
  );
}
