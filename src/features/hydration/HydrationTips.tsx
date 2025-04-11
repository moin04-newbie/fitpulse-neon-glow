
import React from "react";
import { DashboardCard } from "@/components/DashboardCard";
import { Droplet } from "lucide-react";

interface TipItem {
  title: string;
  tip: string;
  icon: React.ReactNode;
}

interface HydrationTipsProps {
  hydrationTips: TipItem[];
  tipIndex: number;
}

export function HydrationTips({ hydrationTips, tipIndex }: HydrationTipsProps) {
  return (
    <DashboardCard
      title="Hydration Tips"
      icon={<Droplet className="h-5 w-5 text-blue-500" />}
      animation="fade-in"
      delay={3}
      className="md:col-span-3"
      variant="gradient"
    >
      <div className="grid md:grid-cols-3 gap-4 p-2">
        {hydrationTips.slice(tipIndex, tipIndex + 3).map((item, i) => (
          <div key={i} className="bg-background/80 backdrop-blur-sm p-4 rounded-lg transform transition-all hover:scale-[1.03]">
            <div className="flex items-center mb-2">
              <div className="bg-blue-500/10 text-blue-500 p-2 rounded-full mr-2">
                {item.icon}
              </div>
              <h4 className="font-medium">{item.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{item.tip}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
