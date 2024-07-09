import { getExpensesMonthlyAmount } from "@/api/get-expenses-monthly-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricsCardSkeleton } from "./metrics-card-skeleton";

export function ExpensesMonthlyAmountCard() {
  const { data: monthlyExpenses } = useQuery({
    queryKey: ["metrics", "expenses-monthly-amount"],
    queryFn: getExpensesMonthlyAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Gastos mensais
        </CardTitle>
        <DollarSign className="size-4 text-primary" />
      </CardHeader>

      <CardContent>
        {monthlyExpenses ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthlyExpenses.currentMonthlyExpenseAmount.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                },
              )}
            </span>

            <p className="text-xs text-muted-foreground">
              {monthlyExpenses.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{monthlyExpenses.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthlyExpenses.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              )}
            </p>
          </>
        ) : (
          <MetricsCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
