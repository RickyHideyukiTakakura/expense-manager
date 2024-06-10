import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link } from "react-router-dom";

export function SignIn() {
  return (
    <div className="p-8">
      <Button className="absolute right-8 top-8" variant="ghost" asChild>
        <Link to="/sign-up">Nova conta</Link>
      </Button>

      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>

          <p className="text-sm text-muted-foreground">
            Acompanhe seus gastos pelo painel do usuário!
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Seu email</Label>
            <Input id="email" type="email" />
          </div>

          <Button className="w-full" type="submit">
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  );
}