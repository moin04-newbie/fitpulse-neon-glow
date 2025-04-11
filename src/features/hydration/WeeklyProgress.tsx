
import React from "react";
import { DashboardCard } from "@/components/DashboardCard";
import { BarChart3 } from "lucide-react";

interface WeeklyProgressProps {
  waterHistory: Array<{ day: string; amount: number; goal: number }>;
  waterGoal: number;
}

export function WeeklyProgress({ waterHistory, waterGoal }: WeeklyProgressProps) {
  return (
    <DashboardCard 
      title="Weekly Progress" 
      icon={<BarChart3 className="h-5 w-5" />}
      animation="fade-in"
      delay={2}
      className="md:col-span-3"
    >
      <div className="h-64 grid grid-cols-7 items-end gap-3 p-4">
        {waterHistory.map((day) => {
          const percentage = (day.amount / day.goal) * 100;
          const height = `${Math.max(5, Math.min(100, percentage))}%`;
          
          return (
            <div key={day.day} className="flex flex-col items-center h-full">
              <div className="flex-1 w-full flex items-end">
                <div 
                  className={`w-full bg-blue-500/20 rounded-t-md relative ${
                    percentage >= 100 ? 'bg-green-500/30' : ''
                  }`}
                  style={{ height }}
                >
                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-blue-500/20 rounded-t-md overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-blue-500/40 to-transparent"></div>
                  </div>
                  <div className="absolute -top-7 inset-x-0 text-center text-xs">
                    {Math.round(percentage)}%
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs">{day.day}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between text-xs text-muted-foreground px-4">
        <div>Last 7 days average: {Math.round(waterHistory.reduce((acc, day) => acc + day.amount, 0) / 7 / 100) / 10}L</div>
        <div>Goal: {waterGoal / 1000}L daily</div>
      </div>
    </DashboardCard>
  );
}
