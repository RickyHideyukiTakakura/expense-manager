import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { ExpenseChart } from "./expense-chart";
import { PopularCategoryChart } from "./popular-category-chart";

export function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-3 items-center gap-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Gastos diários
            </CardTitle>
            <DollarSign className="size-4 text-primary" />
          </CardHeader>

          <CardContent>
            <span className="text-2xl font-bold tracking-tight">R$50,00</span>

            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 dark:text-emerald-400">
                + 10%
              </span>{" "}
              em relação a ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Gastos mensais
            </CardTitle>
            <DollarSign className="size-4 text-primary" />
          </CardHeader>

          <CardContent>
            <span className="text-2xl font-bold tracking-tight">R$1200,00</span>

            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 dark:text-emerald-400">
                + 10%
              </span>{" "}
              em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Gastos totais
            </CardTitle>
            <DollarSign className="size-4 text-primary" />
          </CardHeader>

          <CardContent>
            <span className="text-2xl font-bold tracking-tight">R$1250,00</span>

            <p className="text-xs text-muted-foreground">Totais</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-9 gap-4">
        <ExpenseChart />

        <PopularCategoryChart />
      </div>
    </div>
  );
}
