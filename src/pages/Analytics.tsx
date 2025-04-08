
import { MainLayout } from "@/components/MainLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { BarChart3, Activity, TrendingUp, Trophy, LineChart, Flame } from "lucide-react";
import { ProgressRing } from "@/components/ProgressRing";
import { useState } from "react";
import { weeklyActivityData, userData } from "@/data/mockData";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("weekly");
  
  // Calculate averages for different metrics
  const avgSteps = Math.round(weeklyActivityData.reduce((sum, day) => sum + day.steps, 0) / weeklyActivityData.length);
  const avgCalories = Math.round(weeklyActivityData.reduce((sum, day) => sum + day.caloriesBurned, 0) / weeklyActivityData.length);
  const avgActiveMinutes = Math.round(weeklyActivityData.reduce((sum, day) => sum + day.activeMinutes, 0) / weeklyActivityData.length);
  
  // Progress percentages
  const stepsProgress = Math.min(100, Math.round((avgSteps / userData.goals.steps) * 100));
  const caloriesProgress = Math.min(100, Math.round((avgCalories / userData.goals.calories) * 100));
  const activeMinutesProgress = Math.min(100, Math.round((avgActiveMinutes / 60) * 100));
  
  return (
    <MainLayout pageTitle="Analytics" pageDescription="Track your fitness progress over time">
      <div className="grid gap-6">
        {/* Time period tabs */}
        <div className="flex space-x-2 p-1 bg-muted/50 rounded-lg w-fit">
          {["weekly", "monthly", "yearly"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                activeTab === tab 
                  ? "bg-background shadow-sm" 
                  : "hover:bg-background/50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Steps Progress Card */}
          <DashboardCard
            title="Average Steps"
            icon={<Activity className="h-5 w-5" />}
            animation="fade-in"
            delay={0}
          >
            <div className="flex items-center justify-center py-4">
              <ProgressRing 
                progress={stepsProgress} 
                color="rgb(0, 255, 221)" 
              >
                <div className="text-center">
                  <div className="text-3xl font-bold">{avgSteps.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    Goal: {userData.goals.steps.toLocaleString()}
                  </div>
                </div>
              </ProgressRing>
            </div>
            <div className="mt-2 text-center text-sm text-muted-foreground">
              {stepsProgress}% of daily goal
            </div>
          </DashboardCard>
          
          {/* Calories Progress Card */}
          <DashboardCard
            title="Average Calories"
            icon={<Flame className="h-5 w-5 text-neon-pink" />}
            animation="fade-in"
            delay={1}
          >
            <div className="flex items-center justify-center py-4">
              <ProgressRing 
                progress={caloriesProgress} 
                color="#FF2E63" 
              >
                <div className="text-center">
                  <div className="text-3xl font-bold">{avgCalories.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    Goal: {userData.goals.calories.toLocaleString()}
                  </div>
                </div>
              </ProgressRing>
            </div>
            <div className="mt-2 text-center text-sm text-muted-foreground">
              {caloriesProgress}% of daily goal
            </div>
          </DashboardCard>
          
          {/* Active Minutes Progress Card */}
          <DashboardCard
            title="Active Minutes"
            icon={<TrendingUp className="h-5 w-5 text-green-500" />}
            animation="fade-in"
            delay={2}
          >
            <div className="flex items-center justify-center py-4">
              <ProgressRing 
                progress={activeMinutesProgress} 
                color="rgb(34, 197, 94)" 
              >
                <div className="text-center">
                  <div className="text-3xl font-bold">{avgActiveMinutes}</div>
                  <div className="text-xs text-muted-foreground">
                    Goal: 60 min
                  </div>
                </div>
              </ProgressRing>
            </div>
            <div className="mt-2 text-center text-sm text-muted-foreground">
              {activeMinutesProgress}% of daily goal
            </div>
          </DashboardCard>
        </div>
        
        {/* Activity Chart Card */}
        <DashboardCard
          title="Activity Trends"
          icon={<BarChart3 className="h-5 w-5" />}
          animation="fade-in"
          delay={3}
          variant="elevated"
        >
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md mt-4">
            <div className="text-center">
              <LineChart className="h-8 w-8 text-muted-foreground mb-2 mx-auto" />
              <p className="text-muted-foreground">Weekly activity chart visualization</p>
              <p className="text-xs text-muted-foreground mt-2">Data would be rendered here from chart library</p>
            </div>
          </div>
        </DashboardCard>
        
        {/* Achievement Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <DashboardCard
            title="Recent Achievements"
            icon={<Trophy className="h-5 w-5 text-amber-500" />}
            animation="fade-in"
            delay={4}
          >
            <div className="space-y-3 p-2">
              {[
                { name: "10,000 Steps Goal", date: "April 5", icon: <Activity />, color: "bg-teal-500/10 text-teal-500" },
                { name: "Workout Streak", date: "April 3", icon: <Flame />, color: "bg-red-500/10 text-red-500" },
                { name: "New Personal Record", date: "April 1", icon: <TrendingUp />, color: "bg-indigo-500/10 text-indigo-500" },
              ].map((achievement, i) => (
                <div key={i} className="flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`rounded-full p-2 mr-3 ${achievement.color}`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{achievement.name}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Progress Insights"
            icon={<BarChart3 className="h-5 w-5" />}
            animation="fade-in"
            delay={5}
          >
            <div className="space-y-4 p-2">
              {[
                { label: "Weekly Steps", value: "+12%", up: true, desc: "compared to last week" },
                { label: "Calories Burned", value: "+8%", up: true, desc: "improving steadily" },
                { label: "Active Minutes", value: "-3%", up: false, desc: "slight decrease this week" },
              ].map((insight, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">{insight.label}</h4>
                    <p className="text-xs text-muted-foreground">{insight.desc}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${
                    insight.up 
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-red-500/10 text-red-500"
                  }`}>
                    <span className="text-sm font-medium">{insight.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </MainLayout>
  );
}
