
import { Activity, Droplets, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DailySummaryCardProps {
  overallProgress: number;
  calories: number;
  water: number;
}

export function DailySummaryCard({ overallProgress, calories, water }: DailySummaryCardProps) {
  return (
    <Card className="mb-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Daily Progress</CardTitle>
        <CardDescription>
          Your overall progress for the day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-primary/10 px-3 py-1.5 text-primary">
              <Activity className="h-4 w-4 mr-1" />
              {overallProgress}% Complete
            </Badge>
            <Badge variant="outline" className="bg-amber-500/10 px-3 py-1.5 text-amber-500">
              <Flame className="h-4 w-4 mr-1" />
              {calories.toLocaleString()} kcal
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 px-3 py-1.5 text-blue-500">
              <Droplets className="h-4 w-4 mr-1" />
              {(water / 1000).toFixed(1)}L
            </Badge>
          </div>
          <Button variant="default" size="sm" className="ml-auto">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
