
import { DashboardCard } from "@/components/DashboardCard";
import { ProgressRing } from "@/components/ProgressRing";
import { Activity, Droplets, Flame, Heart, Moon } from "lucide-react";
import { userData } from "@/data/mockData";

interface StatsGridProps {
  stepsData: {
    steps: number;
    completion: number;
    animatedSteps: number;
  };
  caloriesData: {
    calories: number;
    completion: number;
    animatedCalories: number;
  };
  waterData: {
    water: number;
    completion: number;
    animatedWater: number;
  };
  heartRateData: {
    current: number;
    min: number;
    resting: number;
    max: number;
  };
  sleepData: {
    duration: number;
    quality: string;
    cycles: number;
    deepSleep: number;
    remSleep: number;
  };
}

export function StatsGrid({ 
  stepsData, 
  caloriesData, 
  waterData, 
  heartRateData,
  sleepData
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <DashboardCard 
        title="Daily Steps" 
        icon={<Activity className="h-5 w-5" />}
        delay={0}
      >
        <div className="flex items-center justify-center py-4">
          <ProgressRing 
            progress={stepsData.completion > 100 ? 100 : stepsData.completion} 
            color="rgb(0, 255, 221)" 
          >
            <div className="text-center">
              <div className="text-3xl font-bold">{stepsData.animatedSteps.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                Goal: {userData.goals.steps.toLocaleString()}
              </div>
            </div>
          </ProgressRing>
        </div>
        <div className="mt-2 text-center text-sm text-muted-foreground">
          {stepsData.completion.toFixed(0)}% of daily goal
        </div>
      </DashboardCard>
      
      <DashboardCard 
        title="Calories Burned" 
        icon={<Flame className="h-5 w-5 text-neon-pink" />}
        delay={1}
      >
        <div className="flex items-center justify-center py-4">
          <ProgressRing 
            progress={caloriesData.completion > 100 ? 100 : caloriesData.completion} 
            color="#FF2E63" 
          >
            <div className="text-center">
              <div className="text-3xl font-bold">{caloriesData.animatedCalories.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                Goal: {userData.goals.calories.toLocaleString()}
              </div>
            </div>
          </ProgressRing>
        </div>
        <div className="mt-2 text-center text-sm text-muted-foreground">
          {caloriesData.completion.toFixed(0)}% of daily goal
        </div>
      </DashboardCard>
      
      <DashboardCard 
        title="Hydration" 
        icon={<Droplets className="h-5 w-5 text-blue-400" />}
        delay={2}
      >
        <div className="flex items-center justify-center py-2">
          <div className="hydration-glass w-20 h-36 flex items-center justify-center">
            <div 
              className="hydration-water h-0" 
              style={{"--water-level": `${waterData.completion}%`} as React.CSSProperties}
            ></div>
            <div className="relative z-10 text-center">
              <div className="text-2xl font-bold">{(waterData.animatedWater / 1000).toFixed(1)}L</div>
              <div className="text-xs">
                of {(userData.goals.water / 1000).toFixed(1)}L
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center text-sm text-muted-foreground">
          {waterData.completion.toFixed(0)}% of daily goal
        </div>
      </DashboardCard>
      
      <DashboardCard 
        title="Heart Rate" 
        icon={<Heart className="h-5 w-5 text-neon-pink animate-pulse-glow" />}
        delay={3}
      >
        <div className="text-center py-3">
          <div className="text-4xl font-bold mb-2">{heartRateData.current}</div>
          <div className="text-sm text-muted-foreground">BPM</div>
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-sm font-medium">{heartRateData.min}</div>
              <div className="text-xs text-muted-foreground">Min</div>
            </div>
            <div>
              <div className="text-sm font-medium">{heartRateData.resting}</div>
              <div className="text-xs text-muted-foreground">Resting</div>
            </div>
            <div>
              <div className="text-sm font-medium">{heartRateData.max}</div>
              <div className="text-xs text-muted-foreground">Max</div>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard 
        title="Last Night's Sleep" 
        icon={<Moon className="h-5 w-5 text-indigo-400" />}
        delay={5}
      >
        <div className="text-center py-3">
          <div className="text-4xl font-bold mb-1">
            {sleepData.duration}
            <span className="text-xl">hrs</span>
          </div>
          <div className="text-sm text-muted-foreground capitalize mb-3">
            {sleepData.quality} quality
          </div>
          
          <div className="grid grid-cols-3 gap-x-2 text-center mt-2">
            <div>
              <div className="text-sm font-medium">{sleepData.cycles}</div>
              <div className="text-xs text-muted-foreground">Cycles</div>
            </div>
            <div>
              <div className="text-sm font-medium">{sleepData.deepSleep}</div>
              <div className="text-xs text-muted-foreground">Deep</div>
            </div>
            <div>
              <div className="text-sm font-medium">{sleepData.remSleep}</div>
              <div className="text-xs text-muted-foreground">REM</div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
