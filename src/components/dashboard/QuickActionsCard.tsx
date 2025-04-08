
import { Activity, CalendarClock, Droplets, Heart, Moon, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActionsCard() {
  const actions = [
    { name: "Add Workout", icon: <Activity className="h-5 w-5" />, color: "bg-indigo-500/10 text-indigo-500" },
    { name: "Track Water", icon: <Droplets className="h-5 w-5" />, color: "bg-blue-500/10 text-blue-500" },
    { name: "Record Weight", icon: <Weight className="h-5 w-5" />, color: "bg-green-500/10 text-green-500" },
    { name: "Add Sleep", icon: <Moon className="h-5 w-5" />, color: "bg-purple-500/10 text-purple-500" },
    { name: "Take Vitals", icon: <Heart className="h-5 w-5" />, color: "bg-red-500/10 text-red-500" },
    { name: "Schedule", icon: <CalendarClock className="h-5 w-5" />, color: "bg-amber-500/10 text-amber-500" },
  ];

  return (
    <Card className="bg-card text-card-foreground xl:col-span-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => (
            <Button key={index} variant="outline" className="h-auto flex-col py-6 px-4 gap-3 hover:bg-muted transition-colors">
              <div className={`p-3 rounded-full ${action.color}`}>
                {action.icon}
              </div>
              <span className="text-xs">{action.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
