import * as React from "react";
import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function Tabs({
  value,
  onValueChange,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & TabsContextValue) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("w-full", className)} {...props} />
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center rounded-md border border-slate-300 bg-slate-100 p-1",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  value,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within Tabs");
  }

  const active = context.value === value;

  return (
    <button
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-sm px-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-all",
        active && "bg-white text-foreground shadow-[0_8px_18px_rgba(71,85,95,0.12)]",
        className,
      )}
      onClick={() => context.onValueChange(value)}
      type="button"
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger };
