
import { Sparkles, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HealthInsightCard() {
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
          <div className="flex items-start space-x-4 bg-card/50 p-4 rounded-lg">
            <div className="bg-green-500/10 p-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Consistent Progress</h3>
              <p className="text-xs text-muted-foreground mt-1">
                You've increased your daily step average by 12% in the last week.
              </p>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 mt-2">
                +12% Steps
              </Badge>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 bg-card/50 p-4 rounded-lg">
            <div className="bg-amber-500/10 p-2 rounded-full">
              <Zap className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Energy Level</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Your sleep quality is improving, leading to better energy levels throughout the day.
              </p>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 mt-2">
                Better Sleep
              </Badge>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 bg-card/50 p-4 rounded-lg">
            <div className="bg-blue-500/10 p-2 rounded-full">
              <Droplets className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Hydration Streak</h3>
              <p className="text-xs text-muted-foreground mt-1">
                You've hit your hydration goals 5 days in a row. Keep it up!
              </p>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 mt-2">
                5 Day Streak
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
