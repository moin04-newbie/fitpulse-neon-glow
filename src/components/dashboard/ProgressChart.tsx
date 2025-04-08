
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart3, Droplets, Flame, Moon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ProgressChartProps {
  monthlyData: {
    stepCounts: number[];
    sleepHours: number[];
    caloriesBurned: number[];
    activeMinutes: number[];
    waterIntake: number[];
  };
}

type MetricType = 'steps' | 'sleep' | 'calories' | 'active' | 'water';

export function ProgressChart({ monthlyData }: ProgressChartProps) {
  const [activeMetric, setActiveMetric] = useState<MetricType>('steps');
  
  // Convert the data arrays into the format needed for recharts
  const getLast14DaysData = (metric: MetricType) => {
    // Get the last 14 days of data
    const dates = Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 13 + i);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    let values;
    let color;
    let name;
    
    switch (metric) {
      case 'steps':
        values = monthlyData.stepCounts.slice(-14);
        color = "#8B5CF6";
        name = "Steps";
        break;
      case 'sleep':
        values = monthlyData.sleepHours.slice(-14);
        color = "#6366F1";
        name = "Sleep (hrs)";
        break;
      case 'calories':
        values = monthlyData.caloriesBurned.slice(-14);
        color = "#F43F5E";
        name = "Calories";
        break;
      case 'active':
        values = monthlyData.activeMinutes.slice(-14);
        color = "#10B981";
        name = "Active Minutes";
        break;
      case 'water':
        values = monthlyData.waterIntake.slice(-14).map(ml => ml / 1000);
        color = "#0EA5E9";
        name = "Water (L)";
        break;
    }
    
    return {
      data: dates.map((date, i) => ({
        date,
        value: values[i]
      })),
      color,
      name
    };
  };
  
  const chartData = getLast14DaysData(activeMetric);
  
  return (
    <Card className="col-span-1 xl:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Progress Trends
        </CardTitle>
        <Tabs defaultValue="steps" className="w-auto" onValueChange={(value) => setActiveMetric(value as MetricType)}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="steps" className="flex items-center gap-1">
              <Activity className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-xs">Steps</span>
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center gap-1">
              <Moon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-xs">Sleep</span>
            </TabsTrigger>
            <TabsTrigger value="calories" className="flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-xs">Calories</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-1">
              <Activity className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-xs">Active</span>
            </TabsTrigger>
            <TabsTrigger value="water" className="flex items-center gap-1">
              <Droplets className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-xs">Water</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData.data}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  // Only show every other tick on small screens
                  return value.split(" ")[1];
                }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 15, 15, 0.75)', 
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px',
                }}
                itemStyle={{ color: chartData.color }}
                formatter={(value: number) => [value.toLocaleString(), chartData.name]}
                labelStyle={{ fontSize: 14, marginBottom: 4 }}
              />
              <defs>
                <linearGradient id={`gradient-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartData.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartData.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={chartData.color} 
                strokeWidth={2}
                fill={`url(#gradient-${activeMetric})`} 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
