import { AreaChart, HandCoins, Home } from "lucide-react";
import { NavLink } from "./nav-link";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <AreaChart className="size-6 text-primary" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center gap-4">
          <NavLink to="/">
            <Home className="size-4" />
            Início
          </NavLink>

          <NavLink to="/expenses">
            <HandCoins className="size-4" />
            Despesas
          </NavLink>
        </nav>

        {/* <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div> */}
      </div>
    </div>
  );
}
