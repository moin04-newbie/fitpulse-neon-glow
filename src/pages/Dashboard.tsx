
import { 
  Activity, 
  CalendarClock, 
  Droplets, 
  Flame, 
  Heart, 
  Moon, 
  Timer 
} from "lucide-react";
import { MainLayout } from "@/components/MainLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { ProgressRing } from "@/components/ProgressRing";
import { todayData, weeklyActivityData, userData, upcomingWorkouts } from "@/data/mockData";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [animatedSteps, setAnimatedSteps] = useState(0);
  const [animatedCalories, setAnimatedCalories] = useState(0);
  const [animatedWater, setAnimatedWater] = useState(0);
  
  const stepsCompletion = (todayData.steps / userData.goals.steps) * 100;
  const caloriesCompletion = (todayData.caloriesBurned / userData.goals.calories) * 100;
  const waterCompletion = (todayData.water / userData.goals.water) * 100;
  
  useEffect(() => {
    const stepsInterval = setInterval(() => {
      setAnimatedSteps(prev => {
        if (prev < todayData.steps) {
          return Math.min(prev + Math.ceil(todayData.steps / 50), todayData.steps);
        }
        clearInterval(stepsInterval);
        return prev;
      });
    }, 30);
    
    const caloriesInterval = setInterval(() => {
      setAnimatedCalories(prev => {
        if (prev < todayData.caloriesBurned) {
          return Math.min(prev + Math.ceil(todayData.caloriesBurned / 50), todayData.caloriesBurned);
        }
        clearInterval(caloriesInterval);
        return prev;
      });
    }, 30);
    
    const waterInterval = setInterval(() => {
      setAnimatedWater(prev => {
        if (prev < todayData.water) {
          return Math.min(prev + Math.ceil(todayData.water / 40), todayData.water);
        }
        clearInterval(waterInterval);
        return prev;
      });
    }, 30);
    
    return () => {
      clearInterval(stepsInterval);
      clearInterval(caloriesInterval);
      clearInterval(waterInterval);
    };
  }, []);
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <MainLayout pageTitle="Dashboard" pageDescription={today}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Steps Card */}
        <DashboardCard 
          title="Daily Steps" 
          icon={<Activity className="h-5 w-5" />}
          delay={0}
        >
          <div className="flex items-center justify-center py-4">
            <ProgressRing 
              progress={stepsCompletion > 100 ? 100 : stepsCompletion} 
              color="rgb(0, 255, 221)" 
            >
              <div className="text-center">
                <div className="text-3xl font-bold">{animatedSteps.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">
                  Goal: {userData.goals.steps.toLocaleString()}
                </div>
              </div>
            </ProgressRing>
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {stepsCompletion.toFixed(0)}% of daily goal
          </div>
        </DashboardCard>
        
        {/* Calories Card */}
        <DashboardCard 
          title="Calories Burned" 
          icon={<Flame className="h-5 w-5 text-neon-pink" />}
          delay={1}
        >
          <div className="flex items-center justify-center py-4">
            <ProgressRing 
              progress={caloriesCompletion > 100 ? 100 : caloriesCompletion} 
              color="#FF2E63" 
            >
              <div className="text-center">
                <div className="text-3xl font-bold">{animatedCalories.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">
                  Goal: {userData.goals.calories.toLocaleString()}
                </div>
              </div>
            </ProgressRing>
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {caloriesCompletion.toFixed(0)}% of daily goal
          </div>
        </DashboardCard>
        
        {/* Water Card */}
        <DashboardCard 
          title="Hydration" 
          icon={<Droplets className="h-5 w-5 text-blue-400" />}
          delay={2}
        >
          <div className="flex items-center justify-center py-2">
            <div className="hydration-glass w-20 h-36 flex items-center justify-center">
              <div 
                className="hydration-water h-0" 
                style={{"--water-level": `${waterCompletion}%`} as React.CSSProperties}
              ></div>
              <div className="relative z-10 text-center">
                <div className="text-2xl font-bold">{(animatedWater / 1000).toFixed(1)}L</div>
                <div className="text-xs">
                  of {(userData.goals.water / 1000).toFixed(1)}L
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {waterCompletion.toFixed(0)}% of daily goal
          </div>
        </DashboardCard>
        
        {/* Heart Rate Card */}
        <DashboardCard 
          title="Heart Rate" 
          icon={<Heart className="h-5 w-5 text-neon-pink animate-pulse-glow" />}
          delay={3}
        >
          <div className="text-center py-3">
            <div className="text-4xl font-bold mb-2">{todayData.heartRate.current}</div>
            <div className="text-sm text-muted-foreground">BPM</div>
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-sm font-medium">{todayData.heartRate.min}</div>
                <div className="text-xs text-muted-foreground">Min</div>
              </div>
              <div>
                <div className="text-sm font-medium">{todayData.heartRate.resting}</div>
                <div className="text-xs text-muted-foreground">Resting</div>
              </div>
              <div>
                <div className="text-sm font-medium">{todayData.heartRate.max}</div>
                <div className="text-xs text-muted-foreground">Max</div>
              </div>
            </div>
          </div>
        </DashboardCard>
        
        {/* Recent Activity */}
        <DashboardCard 
          title="Recent Activity"
          icon={<Activity className="h-5 w-5" />}
          variant="elevated"
          className="md:col-span-2"
          delay={4}
        >
          <div className="space-y-3">
            {weeklyActivityData.slice(-3).reverse().map((day, index) => (
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
        
        {/* Sleep Card */}
        <DashboardCard 
          title="Last Night's Sleep" 
          icon={<Moon className="h-5 w-5 text-indigo-400" />}
          delay={5}
        >
          <div className="text-center py-3">
            <div className="text-4xl font-bold mb-1">
              {todayData.sleep.last.duration}
              <span className="text-xl">hrs</span>
            </div>
            <div className="text-sm text-muted-foreground capitalize mb-3">
              {todayData.sleep.last.quality} quality
            </div>
            
            <div className="grid grid-cols-3 gap-x-2 text-center mt-2">
              <div>
                <div className="text-sm font-medium">{todayData.sleep.last.cycles}</div>
                <div className="text-xs text-muted-foreground">Cycles</div>
              </div>
              <div>
                <div className="text-sm font-medium">{todayData.sleep.last.deepSleep}</div>
                <div className="text-xs text-muted-foreground">Deep</div>
              </div>
              <div>
                <div className="text-sm font-medium">{todayData.sleep.last.remSleep}</div>
                <div className="text-xs text-muted-foreground">REM</div>
              </div>
            </div>
          </div>
        </DashboardCard>
        
        {/* Upcoming Workouts */}
        <DashboardCard 
          title="Upcoming Workouts" 
          icon={<CalendarClock className="h-5 w-5 text-neon-yellow" />}
          className="xl:col-span-2"
          delay={6}
        >
          <div className="space-y-3">
            {upcomingWorkouts.slice(0, 3).map((workout) => (
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
      </div>
    </MainLayout>
  );
}
