
import { Sparkles, TrendingUp, Zap, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export function HealthInsightCard() {
  // State for dynamic insights
  const [insights, setInsights] = useState([
    {
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      iconBg: "bg-green-500/10",
      title: "Consistent Progress",
      text: "You've increased your daily step average by 12% in the last week.",
      badge: {
        text: "+12% Steps",
        color: "bg-green-500/10 text-green-500"
      }
    },
    {
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      iconBg: "bg-amber-500/10",
      title: "Energy Level",
      text: "Your sleep quality is improving, leading to better energy levels throughout the day.",
      badge: {
        text: "Better Sleep",
        color: "bg-amber-500/10 text-amber-500"
      }
    },
    {
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      iconBg: "bg-blue-500/10",
      title: "Hydration Streak",
      text: "You've hit your hydration goals 5 days in a row. Keep it up!",
      badge: {
        text: "5 Day Streak",
        color: "bg-blue-500/10 text-blue-500"
      }
    }
  ]);

  // Insight rotation effect - every 2 minutes, update one insight
  useEffect(() => {
    const interval = setInterval(() => {
      // We'll rotate through potential insights
      const potentialInsights = [
        {
          icon: <TrendingUp className="h-5 w-5 text-green-500" />,
          iconBg: "bg-green-500/10",
          title: "Weekly Improvement",
          text: "Your average workout duration increased by 15% this week. Great discipline!",
          badge: {
            text: "+15% Duration",
            color: "bg-green-500/10 text-green-500"
          }
        },
        {
          icon: <Zap className="h-5 w-5 text-purple-500" />,
          iconBg: "bg-purple-500/10",
          title: "Workout Intensity",
          text: "You've been pushing harder in your workouts, with heart rate reaching optimal zones more consistently.",
          badge: {
            text: "Higher Intensity",
            color: "bg-purple-500/10 text-purple-500"
          }
        },
        {
          icon: <Droplets className="h-5 w-5 text-blue-500" />,
          iconBg: "bg-blue-500/10",
          title: "Hydration Impact",
          text: "Consistent hydration has improved your post-workout recovery times by approximately 20%.",
          badge: {
            text: "Better Recovery",
            color: "bg-blue-500/10 text-blue-500"
          }
        },
        {
          icon: <TrendingUp className="h-5 w-5 text-green-500" />,
          iconBg: "bg-green-500/10",
          title: "Active Minutes",
          text: "You've accumulated 50 more active minutes this week compared to your average.",
          badge: {
            text: "+50 Minutes",
            color: "bg-green-500/10 text-green-500"
          }
        }
      ];

      // Update a random insight
      setInsights(current => {
        const newInsights = [...current];
        const indexToUpdate = Math.floor(Math.random() * newInsights.length);
        const potentialNewInsights = potentialInsights.filter(
          insight => !current.some(currentInsight => currentInsight.title === insight.title)
        );
        
        if (potentialNewInsights.length > 0) {
          const randomNewInsight = potentialNewInsights[Math.floor(Math.random() * potentialNewInsights.length)];
          newInsights[indexToUpdate] = randomNewInsight;
        }
        
        return newInsights;
      });
    }, 120000); // Every 2 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-1 xl:col-span-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-400" />
          Health Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-4 bg-card/50 p-4 rounded-lg transition-all duration-500 hover:bg-card"
            >
              <div className={`${insight.iconBg} p-2 rounded-full`}>
                {insight.icon}
              </div>
              <div>
                <h3 className="font-medium text-sm">{insight.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {insight.text}
                </p>
                <Badge variant="outline" className={`${insight.badge.color} mt-2`}>
                  {insight.badge.text}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
