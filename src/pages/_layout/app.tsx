import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-12 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
