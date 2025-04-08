
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { todayData, weeklyActivityData, userData, upcomingWorkouts, monthlyProgressData } from "@/data/mockData";
import { DailySummaryCard } from "@/components/dashboard/DailySummaryCard";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivityList } from "@/components/dashboard/RecentActivityList";
import { UpcomingWorkoutsList } from "@/components/dashboard/UpcomingWorkoutsList";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { HealthInsightCard } from "@/components/dashboard/HealthInsightCard";
import { ProgressChart } from "@/components/dashboard/ProgressChart";

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
  
  const overallProgress = Math.round((stepsCompletion + caloriesCompletion + waterCompletion) / 3);
  
  return (
    <MainLayout pageTitle="Dashboard" pageDescription={today}>
      <DailySummaryCard 
        overallProgress={overallProgress} 
        calories={animatedCalories} 
        water={animatedWater} 
      />
      
      <StatsGrid 
        stepsData={{
          steps: todayData.steps,
          completion: stepsCompletion,
          animatedSteps
        }}
        caloriesData={{
          calories: todayData.caloriesBurned,
          completion: caloriesCompletion,
          animatedCalories
        }}
        waterData={{
          water: todayData.water,
          completion: waterCompletion,
          animatedWater
        }}
        heartRateData={todayData.heartRate}
        sleepData={todayData.sleep.last}
      />
      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        <RecentActivityList activityData={weeklyActivityData} />
        <UpcomingWorkoutsList workouts={upcomingWorkouts} />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mt-6">
        <ProgressChart monthlyData={monthlyProgressData} />
        <HealthInsightCard />
        <QuickActionsCard />
      </div>
    </MainLayout>
  );
}
