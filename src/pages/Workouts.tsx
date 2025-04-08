
import { MainLayout } from "@/components/MainLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Dumbbell, Clock, Calendar, Zap, Target, Plus, Filter, List, Timer } from "lucide-react";
import { useState } from "react";

export default function Workouts() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const workoutTypes = [
    { name: "Strength", color: "bg-red-500/10 text-red-500" },
    { name: "Cardio", color: "bg-blue-500/10 text-blue-500" },
    { name: "HIIT", color: "bg-orange-500/10 text-orange-500" },
    { name: "Flexibility", color: "bg-purple-500/10 text-purple-500" },
    { name: "Recovery", color: "bg-green-500/10 text-green-500" },
  ];
  
  const workouts = [
    {
      id: 1,
      name: "Full Body Strength",
      type: "Strength",
      duration: 45,
      difficulty: "Intermediate",
      lastPerformed: "2 days ago",
      exercises: 12,
    },
    {
      id: 2,
      name: "HIIT Cardio",
      type: "HIIT",
      duration: 30,
      difficulty: "Advanced",
      lastPerformed: "1 week ago",
      exercises: 8,
    },
    {
      id: 3,
      name: "Morning Yoga",
      type: "Flexibility",
      duration: 20,
      difficulty: "Beginner",
      lastPerformed: "Yesterday",
      exercises: 10,
    },
    {
      id: 4,
      name: "Core Crusher",
      type: "Strength",
      duration: 15,
      difficulty: "Intermediate",
      lastPerformed: "3 days ago",
      exercises: 6,
    },
    {
      id: 5,
      name: "Outdoor Run",
      type: "Cardio",
      duration: 40,
      difficulty: "Intermediate",
      lastPerformed: "Today",
      exercises: 1,
    },
    {
      id: 6,
      name: "Recovery Stretch",
      type: "Recovery",
      duration: 15,
      difficulty: "Beginner",
      lastPerformed: "4 days ago",
      exercises: 8,
    },
  ];
  
  const getTypeColor = (type: string) => {
    const workoutType = workoutTypes.find(t => t.name === type);
    return workoutType?.color || "bg-primary/10 text-primary";
  };
  
  return (
    <MainLayout pageTitle="Workouts" pageDescription="View and manage your workout routines">
      <div className="grid gap-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center space-x-2 text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" />
              <span>New Workout</span>
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md flex items-center space-x-2 text-sm font-medium hover:bg-secondary/90 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
          
          <div className="flex bg-muted/50 rounded-md p-1">
            <button 
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-background shadow-sm' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Dumbbell className="h-4 w-4" />
            </button>
            <button 
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-background shadow-sm' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Workout Types */}
        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium">
            All Types
          </div>
          {workoutTypes.map((type) => (
            <div 
              key={type.name}
              className={`px-4 py-2 rounded-full text-sm font-medium ${type.color} cursor-pointer hover:opacity-80 transition-opacity`}
            >
              {type.name}
            </div>
          ))}
        </div>
        
        {/* Workouts Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout, index) => (
              <DashboardCard
                key={workout.id}
                animation="fade-in"
                delay={index}
                className="group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(workout.type)}`}>
                    {workout.type}
                  </div>
                  <div className="text-xs text-muted-foreground">{workout.lastPerformed}</div>
                </div>
                
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">{workout.name}</h3>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{workout.duration} min</span>
                  <span className="mx-2">•</span>
                  <Target className="h-4 w-4 mr-1" />
                  <span>{workout.difficulty}</span>
                </div>
                
                <div className="flex justify-between mt-3 pt-3 border-t border-border/50">
                  <div className="text-sm">
                    <span className="text-muted-foreground">{workout.exercises} exercises</span>
                  </div>
                  <button className="text-primary text-sm hover:underline">Start</button>
                </div>
              </DashboardCard>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg divide-y">
            {workouts.map((workout) => (
              <div key={workout.id} className="flex items-center p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(workout.type)} mr-4`}>
                  <Dumbbell className="h-5 w-5" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">{workout.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{workout.duration} min</span>
                    <span className="mx-1">•</span>
                    <span>{workout.difficulty}</span>
                    <span className="mx-1">•</span>
                    <span>{workout.exercises} exercises</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground mr-4">
                  {workout.lastPerformed}
                </div>
                
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
                  Start
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Recent Activity */}
        <DashboardCard 
          title="Recent Activity" 
          icon={<Timer className="h-5 w-5" />}
          animation="fade-in"
          delay={8}
        >
          <div className="space-y-4 py-2">
            {[
              { name: "Morning Yoga", date: "Today, 7:30 AM", duration: "20 min" },
              { name: "HIIT Cardio", date: "Yesterday, 5:45 PM", duration: "30 min" },
              { name: "Full Body Strength", date: "Monday, 6:15 PM", duration: "45 min" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-muted/80 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <Dumbbell className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{activity.name}</h4>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <div className="bg-muted/50 px-2 py-1 rounded-md text-xs">
                  {activity.duration}
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </MainLayout>
  );
}
