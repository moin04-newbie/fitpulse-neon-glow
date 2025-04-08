
import { MainLayout } from "@/components/MainLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Moon, Zap, Activity, Heart, Battery, BarChart3, Calendar, BedDouble, Clock } from "lucide-react";
import { ProgressRing } from "@/components/ProgressRing";
import { useState, useEffect } from "react";
import { todayData } from "@/data/mockData";

export default function Recovery() {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const recoveryScore = 84;
  const sleepHours = todayData.sleep.last.duration;
  const sleepQuality = todayData.sleep.last.quality;
  
  const sleepData = [
    { day: "Mon", hours: 7.2, quality: "Good" },
    { day: "Tue", hours: 6.5, quality: "Fair" },
    { day: "Wed", hours: 7.8, quality: "Good" },
    { day: "Thu", hours: 8.2, quality: "Excellent" },
    { day: "Fri", hours: 7.5, quality: "Good" },
    { day: "Sat", hours: 8.5, quality: "Excellent" },
    { day: "Sun", hours: 7.0, quality: "Fair" },
  ];
  
  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setAnimatedScore(prev => {
        if (prev < recoveryScore) {
          return Math.min(prev + Math.ceil(recoveryScore / 40), recoveryScore);
        }
        clearInterval(scoreInterval);
        return prev;
      });
    }, 30);
    
    return () => {
      clearInterval(scoreInterval);
    };
  }, []);
  
  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-amber-500';
      case 'poor': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };
  
  return (
    <MainLayout pageTitle="Recovery" pageDescription="Track your sleep and recovery metrics">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Recovery Score */}
        <DashboardCard 
          className="md:col-span-2"
          animation="fade-in"
          delay={0}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center py-4">
              <h2 className="text-lg font-medium mb-3">Recovery Score</h2>
              <ProgressRing 
                progress={animatedScore} 
                color={
                  animatedScore >= 80 ? "rgb(34, 197, 94)" : 
                  animatedScore >= 60 ? "rgb(59, 130, 246)" : 
                  animatedScore >= 40 ? "rgb(234, 179, 8)" : 
                  "rgb(239, 68, 68)"
                } 
                size={180}
              >
                <div className="text-center">
                  <div className="text-5xl font-bold">{animatedScore}</div>
                  <div className="text-sm text-muted-foreground">
                    {
                      animatedScore >= 80 ? "Excellent" : 
                      animatedScore >= 60 ? "Good" : 
                      animatedScore >= 40 ? "Fair" : 
                      "Poor"
                    }
                  </div>
                </div>
              </ProgressRing>
            </div>
            
            <div className="flex flex-col justify-center">
              <h3 className="text-md font-medium mb-4">Recovery Factors</h3>
              <div className="space-y-4">
                {[
                  { 
                    label: "Sleep Duration", 
                    value: `${sleepHours} hrs`, 
                    icon: <BedDouble className="h-5 w-5 text-blue-400" />,
                    score: 85
                  },
                  { 
                    label: "Sleep Quality", 
                    value: sleepQuality, 
                    icon: <Moon className="h-5 w-5 text-indigo-400" />,
                    score: 78
                  },
                  { 
                    label: "Resting Heart Rate", 
                    value: `${todayData.heartRate.resting} bpm`, 
                    icon: <Heart className="h-5 w-5 text-red-400" />,
                    score: 92
                  },
                  { 
                    label: "HRV", 
                    value: "65 ms", 
                    icon: <Activity className="h-5 w-5 text-green-400" />,
                    score: 79
                  },
                ].map((factor, i) => (
                  <div key={i} className="flex items-center">
                    <div className="bg-muted/70 p-2 rounded-full mr-3">
                      {factor.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{factor.label}</span>
                        <span className="text-sm">{factor.value}</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted/50 rounded-full mt-1 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            factor.score >= 80 ? "bg-green-500" : 
                            factor.score >= 60 ? "bg-blue-500" : 
                            factor.score >= 40 ? "bg-amber-500" : 
                            "bg-red-500"
                          }`}
                          style={{ width: `${factor.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DashboardCard>
        
        {/* Readiness */}
        <DashboardCard 
          title="Today's Readiness" 
          icon={<Battery className="h-5 w-5 text-green-500" />}
          animation="fade-in"
          delay={1}
        >
          <div className="py-2 space-y-4">
            <div className="text-center">
              <div className="text-3xl font-medium mb-1">Ready to Train</div>
              <div className="text-sm text-muted-foreground">Based on your recovery score</div>
            </div>
            
            <div className="space-y-3 pt-2">
              {[
                { label: "Suggested Intensity", value: "Moderate to High", status: "good" },
                { label: "Focus Areas", value: "Cardio, Strength", status: "good" },
                { label: "Rest Recommendation", value: "None needed", status: "good" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="text-sm">{item.label}</div>
                  <div className={`text-sm px-2 py-1 rounded-full ${
                    item.status === 'good' ? 'bg-green-500/10 text-green-500' : 
                    item.status === 'fair' ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>
        
        {/* Sleep Insights */}
        <DashboardCard 
          title="Last Night's Sleep" 
          icon={<Moon className="h-5 w-5 text-indigo-400" />}
          animation="fade-in"
          delay={2}
        >
          <div className="pt-2">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-3xl font-bold">{sleepHours}h</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${getQualityColor(sleepQuality)} bg-muted/50`}>
                {sleepQuality}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-x-2 text-center">
              <div className="bg-muted/30 p-2 rounded-md">
                <div className="text-sm font-medium">{todayData.sleep.last.deepSleep}h</div>
                <div className="text-xs text-muted-foreground">Deep</div>
              </div>
              <div className="bg-muted/30 p-2 rounded-md">
                <div className="text-sm font-medium">{todayData.sleep.last.remSleep}h</div>
                <div className="text-xs text-muted-foreground">REM</div>
              </div>
              <div className="bg-muted/30 p-2 rounded-md">
                <div className="text-sm font-medium">{(sleepHours - todayData.sleep.last.deepSleep - todayData.sleep.last.remSleep).toFixed(1)}h</div>
                <div className="text-xs text-muted-foreground">Light</div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>10:45 PM - 6:15 AM</span>
              </div>
              <div className="text-muted-foreground">
                {todayData.sleep.last.cycles} cycles
              </div>
            </div>
          </div>
        </DashboardCard>
        
        {/* Sleep Cycles */}
        <DashboardCard 
          title="Sleep Cycles" 
          icon={<Activity className="h-5 w-5" />}
          animation="fade-in"
          delay={3}
          variant="elevated"
          className="md:col-span-3"
        >
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md mt-4">
            <div className="text-center">
              <Activity className="h-8 w-8 text-muted-foreground mb-2 mx-auto" />
              <p className="text-muted-foreground">Sleep cycle graph visualization</p>
              <p className="text-xs text-muted-foreground mt-2">Data would be rendered here from chart library</p>
            </div>
          </div>
        </DashboardCard>
        
        {/* Weekly Sleep Trends */}
        <DashboardCard 
          title="Weekly Sleep Trends" 
          icon={<BarChart3 className="h-5 w-5" />}
          animation="fade-in"
          delay={4}
          className="md:col-span-3"
        >
          <div className="grid grid-cols-7 gap-4 px-2 py-4">
            {sleepData.map((day) => (
              <div key={day.day} className="flex flex-col items-center">
                <div className={`text-xs font-medium ${getQualityColor(day.quality)}`}>
                  {day.quality}
                </div>
                <div className="w-full bg-muted/40 rounded-full h-32 my-2 relative">
                  <div 
                    className="absolute bottom-0 w-full bg-indigo-400/70 rounded-full"
                    style={{ height: `${(day.hours / 10) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm font-medium">{day.hours}h</div>
                <div className="text-xs text-muted-foreground">{day.day}</div>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Average: {(sleepData.reduce((sum, day) => sum + day.hours, 0) / sleepData.length).toFixed(1)} hours
          </div>
        </DashboardCard>
      </div>
    </MainLayout>
  );
}
