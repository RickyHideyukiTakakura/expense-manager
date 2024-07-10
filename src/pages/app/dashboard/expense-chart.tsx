import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";

import { getExpensesDailyAmountInPeriod } from "@/api/get-expenses-daily-amount-in-period";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";

// const chartData = [
//   {
//     date: "01/01/2024",
//     receipt: 800,
//   },
//   {
//     date: "02/01/2024",
//     receipt: 1000,
//   },
//   {
//     date: "03/01/2024",
//     receipt: 2000,
//   },
//   {
//     date: "04/01/2024",
//     receipt: 200,
//   },
//   {
//     date: "05/01/2024",
//     receipt: 500,
//   },
//   {
//     date: "06/01/2024",
//     receipt: 100,
//   },
//   {
//     date: "07/01/2024",
//     receipt: 700,
//   },
// ];

export function ExpenseChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: expensesDailyAmountInPeriod } = useQuery({
    queryKey: ["metrics", "expenses-daily-amount-in-period", dateRange],
    queryFn: () =>
      getExpensesDailyAmountInPeriod({
        from: dateRange?.from?.toISOString(),
        to: dateRange?.to?.toISOString(),
      }),
  });

  const chartData = useMemo(() => {
    return expensesDailyAmountInPeriod?.expensesAmountInPeriod.map(
      (chartItem) => {
        return {
          amount: chartItem.amount,
          date: new Date(chartItem.date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        };
      },
    );
  }, [expensesDailyAmountInPeriod]);

  console.log(chartData);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Gastos no período
          </CardTitle>

          <CardDescription>Gasto diário no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>

          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>

      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />

              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type="linear"
                strokeWidth={2}
                dataKey="amount"
                stroke={colors.violet["500"]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
