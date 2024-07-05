import { getExpensesTotalAmount } from "@/api/get-expenses-total-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

export function ExpensesTotalAmountCard() {
  const { data: result, isLoading: isLoadingTotalAmount } = useQuery({
    queryKey: ["expenses-total-amount"],
    queryFn: getExpensesTotalAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Gastos totais</CardTitle>
        <DollarSign className="size-4 text-primary" />
      </CardHeader>

      <CardContent>
        {isLoadingTotalAmount && <Skeleton className="h-4 w-52" />}

        {result && (
          <span className="text-2xl font-bold tracking-tight">
            {result.totalAmount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        )}

        <p className="text-xs text-muted-foreground">Totais</p>
      </CardContent>
    </Card>
  );
}
