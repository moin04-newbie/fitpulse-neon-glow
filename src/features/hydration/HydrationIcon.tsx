
import React from "react";
import { Droplets, Plus } from "lucide-react";

interface HydrationIconProps {
  type: "small" | "medium" | "large" | "bottle" | "plus";
  className?: string;
}

export function HydrationIcon({ type, className = "" }: HydrationIconProps) {
  switch (type) {
    case "small":
    case "medium":
    case "large":
    case "bottle":
      return <Droplets size={16} className={className} />;
    case "plus":
      return <Plus size={16} className={className} />;
    default:
      return null;
  }
}
