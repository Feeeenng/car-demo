import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold tracking-[0.12em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-orange-industrial/45 bg-orange-industrial/10 text-orange-industrial",
        steel: "border-slate-300 bg-slate-100 text-slate-700",
        muted: "border-slate-300 bg-white/70 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
