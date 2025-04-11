
import React from "react";

interface HydrationTrackerProps {
  animatedWater: number;
  waterGoal: number;
  waterCompletion: number;
}

export function HydrationTracker({ 
  animatedWater, 
  waterGoal, 
  waterCompletion 
}: HydrationTrackerProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-lg font-medium mb-4">Today's Hydration</h2>
      <div className="hydration-glass w-32 h-56 flex items-center justify-center mb-6">
        <div 
          className="hydration-water h-0" 
          style={{"--water-level": `${waterCompletion}%`} as React.CSSProperties}
        ></div>
        <div className="relative z-10 text-center">
          <div className="text-3xl font-bold">{(animatedWater / 1000).toFixed(1)}L</div>
          <div className="text-sm text-muted-foreground">
            of {(waterGoal / 1000).toFixed(1)}L
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-muted-foreground mb-4">
        {waterCompletion.toFixed(0)}% of daily goal
      </div>
    </div>
  );
}
