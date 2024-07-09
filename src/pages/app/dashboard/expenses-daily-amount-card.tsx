import { getExpensesDailyAmount } from "@/api/get-expenses-daily-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricsCardSkeleton } from "./metrics-card-skeleton";

export function ExpensesDailyAmountCard() {
  const { data: dailyExpenses } = useQuery({
    queryKey: ["metrics", "expenses-daily-amount"],
    queryFn: getExpensesDailyAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Gastos diários
        </CardTitle>
        <DollarSign className="size-4 text-primary" />
      </CardHeader>

      <CardContent>
        {dailyExpenses ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dailyExpenses.dailyExpenseAmount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <p className="text-xs text-muted-foreground">
              {dailyExpenses.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{dailyExpenses.diffFromYesterday}%
                  </span>{" "}
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {dailyExpenses.diffFromYesterday}%
                  </span>{" "}
                  em relação a ontem
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
