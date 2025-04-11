
import React from "react";
import { DashboardCard } from "@/components/DashboardCard";
import { Clock } from "lucide-react";
import { HydrationIcon } from "./HydrationIcon";

interface HydrationLogProps {
  intakeLog: Array<{ time: string; amount: number; type: string }>;
  setShowCustomInput: (show: boolean) => void;
}

export function HydrationLog({ intakeLog, setShowCustomInput }: HydrationLogProps) {
  return (
    <DashboardCard 
      title="Today's Log" 
      icon={<Clock className="h-5 w-5" />}
      animation="fade-in"
      delay={1}
    >
      <div className="divide-y divide-border/50 max-h-[300px] overflow-y-auto">
        {intakeLog.map((entry, i) => (
          <div key={i} className="py-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">{entry.time}</div>
              <div className="text-xs text-muted-foreground">{entry.type}</div>
            </div>
            <div className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded text-sm">
              {entry.amount}ml
            </div>
          </div>
        ))}
      </div>
      <button 
        className="w-full mt-3 py-2 text-sm text-primary hover:underline flex items-center justify-center"
        onClick={() => setShowCustomInput(true)}
      >
        <HydrationIcon type="plus" className="mr-1" />
        Add Entry
      </button>
    </DashboardCard>
  );
}
