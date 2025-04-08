
import { Activity } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { formatDistanceToNow } from "date-fns";

interface ActivityData {
  date: string;
  steps: number;
  caloriesBurned: number;
  activeMinutes: number;
}

interface RecentActivityListProps {
  activityData: ActivityData[];
  delay?: number;
}

export function RecentActivityList({ activityData, delay = 4 }: RecentActivityListProps) {
  return (
    <DashboardCard 
      title="Recent Activity"
      icon={<Activity className="h-5 w-5" />}
      variant="elevated"
      className="md:col-span-2"
      delay={delay}
    >
      <div className="space-y-3">
        {activityData.slice(-3).reverse().map((day, index) => (
          <div key={day.date} className="flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="bg-primary/10 rounded-full p-2 mr-4">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(day.date), { addSuffix: true })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {day.steps.toLocaleString()} steps · {day.caloriesBurned.toLocaleString()} kcal · {day.activeMinutes} active min
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
