import { AreaChart } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen antialiased md:grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10">
        <div className="flex items-center gap-3 text-lg font-medium text-primary">
          <AreaChart className="size-5" />
          <span className="font-semibold">expense.manager</span>
        </div>

        <footer className="text-sm text-primary/70">
          Painel do parceiro &copy; expense.manager - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
