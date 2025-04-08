import { MainLayout } from "@/components/MainLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Activity, HeartPulse, Wind, Zap, Brain, Thermometer, Scale, BarChart3 } from "lucide-react";
import { ProgressRing } from "@/components/ProgressRing";
import { todayData, weeklyActivityData } from "@/data/mockData";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

export default function Vitals() {
  const [animatedHeartRate, setAnimatedHeartRate] = useState(0);
  const [animatedOxygen, setAnimatedOxygen] = useState(0);
  const [animatedTemperature, setAnimatedTemperature] = useState(0);
  
  const vitalsData = {
    bloodPressure: {
      systolic: 120,
      diastolic: 80,
      lastChecked: "2025-04-06T08:30:00"
    },
    oxygenLevel: 98, // percentage
    temperature: 36.6, // celsius
    respiratoryRate: 16, // breaths per minute
    stress: 32, // percentage
    hydration: 87, // percentage
    weight: {
      current: 68.5,
      goal: 67.0,
      lastWeek: 69.1,
      change: -0.6
    }
  };
  
  useEffect(() => {
    const heartRateInterval = setInterval(() => {
      setAnimatedHeartRate(prev => {
        if (prev < todayData.heartRate.current) {
          return Math.min(prev + Math.ceil(todayData.heartRate.current / 20), todayData.heartRate.current);
        }
        clearInterval(heartRateInterval);
        return prev;
      });
    }, 40);
    
    const oxygenInterval = setInterval(() => {
      setAnimatedOxygen(prev => {
        if (prev < vitalsData.oxygenLevel) {
          return Math.min(prev + Math.ceil(vitalsData.oxygenLevel / 20), vitalsData.oxygenLevel);
        }
        clearInterval(oxygenInterval);
        return prev;
      });
    }, 40);
    
    const tempInterval = setInterval(() => {
      setAnimatedTemperature(prev => {
        if (prev < vitalsData.temperature) {
          return Math.min(prev + vitalsData.temperature / 20, vitalsData.temperature);
        }
        clearInterval(tempInterval);
        return prev;
      });
    }, 40);
    
    return () => {
      clearInterval(heartRateInterval);
      clearInterval(oxygenInterval);
      clearInterval(tempInterval);
    };
  }, []);
  
  return (
    <MainLayout pageTitle="Vitals" pageDescription="Monitor your health metrics">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <DashboardCard 
          title="Heart Rate" 
          icon={<HeartPulse className="h-5 w-5 text-red-500" />}
          delay={0}
          className="animate-fade-in"
        >
          <div className="flex items-center justify-center py-4">
            <ProgressRing 
              progress={70} 
              color="#FF2E63" 
            >
              <div className="text-center">
                <div className="text-4xl font-bold flex items-center justify-center">
                  {animatedHeartRate}
                  <span className="text-xs ml-1 text-muted-foreground">BPM</span>
                </div>
              </div>
            </ProgressRing>
          </div>
          <div className="mt-2 grid grid-cols-3 text-center text-sm">
            <div>
              <div className="text-muted-foreground text-xs">Min</div>
              <div className="font-medium">{todayData.heartRate.min}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Avg</div>
              <div className="font-medium">{Math.round((todayData.heartRate.min + todayData.heartRate.max) / 2)}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Max</div>
              <div className="font-medium">{todayData.heartRate.max}</div>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Blood Pressure" 
          icon={<Activity className="h-5 w-5 text-blue-500" />}
          delay={1}
          className="animate-fade-in"
        >
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <div className="text-4xl font-bold flex items-center justify-center">
                {vitalsData.bloodPressure.systolic}/{vitalsData.bloodPressure.diastolic}
                <span className="text-xs ml-1 text-muted-foreground">mmHg</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Last checked: {formatDistanceToNow(new Date(vitalsData.bloodPressure.lastChecked), { addSuffix: true })}
              </div>
            </div>
          </div>
          <div className="mt-2 text-center text-sm bg-primary/5 py-2 rounded-md">
            <span className="text-green-500 font-medium">Normal</span> - Within recommended range
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Blood Oxygen" 
          icon={<Wind className="h-5 w-5 text-cyan-500" />}
          delay={2}
          className="animate-fade-in"
        >
          <div className="flex items-center justify-center py-4">
            <ProgressRing 
              progress={animatedOxygen} 
              color="#0EA5E9" 
            >
              <div className="text-center">
                <div className="text-4xl font-bold flex items-center justify-center">
                  {animatedOxygen}
                  <span className="text-xs ml-1 text-muted-foreground">%</span>
                </div>
              </div>
            </ProgressRing>
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            <span className="text-cyan-500 font-medium">Excellent</span> oxygen saturation level
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Respiratory Rate" 
          icon={<Wind className="h-5 w-5 text-teal-500" />}
          delay={3}
          className="animate-fade-in"
        >
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <div className="text-4xl font-bold flex items-center justify-center">
                {vitalsData.respiratoryRate}
                <span className="text-xs ml-1 text-muted-foreground">BrPM</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Breaths per minute
              </div>
            </div>
          </div>
          <div className="mt-2 text-center text-sm bg-primary/5 py-2 rounded-md">
            <span className="text-green-500 font-medium">Normal</span> - Healthy adult range (12-20)
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Stress Level" 
          icon={<Brain className="h-5 w-5 text-purple-500" />}
          delay={4}
          className="animate-fade-in"
        >
          <div className="flex items-center justify-center py-4">
            <ProgressRing 
              progress={vitalsData.stress} 
              color="#9333EA" 
            >
              <div className="text-center">
                <div className="text-4xl font-bold">{vitalsData.stress}</div>
                <div className="text-xs text-muted-foreground">out of 100</div>
              </div>
            </ProgressRing>
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            <span className="text-green-500 font-medium">Low stress</span> detected today
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Body Temperature" 
          icon={<Thermometer className="h-5 w-5 text-orange-500" />}
          delay={5}
          className="animate-fade-in"
        >
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <div className="text-4xl font-bold flex items-center justify-center">
                {animatedTemperature.toFixed(1)}
                <span className="text-xs ml-1 text-muted-foreground">°C</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Normal range: 36.1 - 37.2°C
              </div>
            </div>
          </div>
          <div className="mt-2 text-center text-sm bg-primary/5 py-2 rounded-md">
            <span className="text-green-500 font-medium">Normal</span> - Within healthy range
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Weight" 
          icon={<Scale className="h-5 w-5 text-blue-400" />}
          delay={6}
          className="animate-fade-in md:col-span-2"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2">
            <div className="flex flex-col items-center justify-center bg-primary/5 p-4 rounded-lg">
              <span className="text-xs text-muted-foreground mb-1">Current</span>
              <span className="text-3xl font-bold">{vitalsData.weight.current}</span>
              <span className="text-xs text-muted-foreground mt-1">kg</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-primary/5 p-4 rounded-lg">
              <span className="text-xs text-muted-foreground mb-1">Goal</span>
              <span className="text-3xl font-bold">{vitalsData.weight.goal}</span>
              <span className="text-xs text-muted-foreground mt-1">kg</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-primary/5 p-4 rounded-lg">
              <span className="text-xs text-muted-foreground mb-1">Change</span>
              <span className={`text-3xl font-bold ${vitalsData.weight.change < 0 ? 'text-green-500' : 'text-red-500'}`}>
                {vitalsData.weight.change > 0 ? '+' : ''}{vitalsData.weight.change}
              </span>
              <span className="text-xs text-muted-foreground mt-1">kg this week</span>
            </div>
          </div>
          <div className="mt-4 w-full h-16 bg-muted/20 rounded-md relative overflow-hidden">
            <div className="flex items-center justify-between px-4 h-full text-xs">
              <span>Start: {vitalsData.weight.lastWeek} kg</span>
              <span>Goal: {vitalsData.weight.goal} kg</span>
            </div>
            <div 
              className="absolute bottom-0 left-0 h-1 bg-green-500" 
              style={{ 
                width: `${(Math.abs(vitalsData.weight.lastWeek - vitalsData.weight.current) / 
                Math.abs(vitalsData.weight.lastWeek - vitalsData.weight.goal)) * 100}%` 
              }}
            ></div>
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Weekly Trends" 
          icon={<BarChart3 className="h-5 w-5" />}
          delay={7}
          className="animate-fade-in"
          variant="elevated"
        >
          <div className="space-y-4 p-2">
            {[
              { label: 'Resting HR', current: todayData.heartRate.resting, previous: todayData.heartRate.resting + 3, unit: 'bpm', good: 'lower' },
              { label: 'Avg. Stress', current: vitalsData.stress, previous: vitalsData.stress + 8, unit: '%', good: 'lower' },
              { label: 'Avg. Sleep', current: 7.5, previous: 7.1, unit: 'hrs', good: 'higher' },
              { label: 'Recovery Score', current: 82, previous: 75, unit: '%', good: 'higher' }
            ].map((item, i) => {
              const isImproved = item.good === 'lower' 
                ? item.current < item.previous 
                : item.current > item.previous;
              const percentChange = ((Math.abs(item.current - item.previous) / item.previous) * 100).toFixed(0);
              
              return (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm">{item.label}</div>
                    <div className="flex items-baseline">
                      <span className="text-xl font-medium">{item.current}</span>
                      <span className="text-xs ml-1 text-muted-foreground">{item.unit}</span>
                    </div>
                  </div>
                  <div className={`p-1.5 rounded-md flex items-center ${isImproved ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    <Zap className="h-3 w-3 mr-1" />
                    <span className="text-xs">{percentChange}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>
      </div>
    </MainLayout>
  );
}
