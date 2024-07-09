import { getExpensesTotalAmount } from "@/api/get-expenses-total-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricsCardSkeleton } from "./metrics-card-skeleton";

export function ExpensesTotalAmountCard() {
  const { data: expensesTotalAmount } = useQuery({
    queryKey: ["metrics", "expenses-total-amount"],
    queryFn: getExpensesTotalAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Gastos totais</CardTitle>
        <DollarSign className="size-4 text-primary" />
      </CardHeader>

      <CardContent>
        {expensesTotalAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {expensesTotalAmount.totalAmount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <p className="text-xs text-muted-foreground">Totais</p>
          </>
        ) : (
          <MetricsCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
