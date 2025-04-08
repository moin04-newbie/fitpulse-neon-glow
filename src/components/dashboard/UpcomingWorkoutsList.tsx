
import { CalendarClock, Timer } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";

interface Workout {
  id: number;
  name: string;
  type: string;
  scheduled: string;
  duration: number;
}

interface UpcomingWorkoutsListProps {
  workouts: Workout[];
  delay?: number;
}

export function UpcomingWorkoutsList({ workouts, delay = 6 }: UpcomingWorkoutsListProps) {
  return (
    <DashboardCard 
      title="Upcoming Workouts" 
      icon={<CalendarClock className="h-5 w-5 text-neon-yellow" />}
      className="xl:col-span-2"
      delay={delay}
    >
      <div className="space-y-3">
        {workouts.slice(0, 3).map((workout) => (
          <div key={workout.id} className="flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="bg-accent/10 rounded-full p-2 mr-4">
              <Timer className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{workout.name}</h4>
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                  {workout.type}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {new Date(workout.scheduled).toLocaleString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </p>
                <p className="text-xs text-muted-foreground">{workout.duration} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
