
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const cardVariants = cva(
  "relative overflow-hidden rounded-xl p-4 shadow-md transition-all hover:shadow-lg", 
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        gradient: "bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 backdrop-blur-sm",
        outline: "border border-border bg-transparent",
        elevated: "bg-card text-card-foreground shadow-lg",
      },
      size: {
        sm: "p-3",
        default: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface DashboardCardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  animation?: "slide-in" | "fade-in" | "none";
  delay?: number;
}

export function DashboardCard({
  className,
  variant,
  size,
  title,
  icon,
  footer,
  animation = "slide-in",
  delay = 0,
  children,
  ...props
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        cardVariants({ variant, size }),
        animation !== "none" && `animate-${animation}`,
        "opacity-0",
        className
      )}
      style={{ 
        animationDelay: `${delay * 0.1}s`, 
        animationFillMode: "forwards"
      }}
      {...props}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-3">
          {title && <h3 className="font-medium text-sm">{title}</h3>}
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      )}
      <div>{children}</div>
      {footer && <div className="mt-3 pt-3 border-t border-border/50">{footer}</div>}
    </div>
  );
}
