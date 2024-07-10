import { api } from "@/lib/axios";

export interface GetExpensesDailyAmountInPeriodQuery {
  from?: string;
  to?: string;
}

export interface GetExpensesDailyAmountInPeriodResponse {
  expensesAmountInPeriod: {
    amount: number;
    date: string;
  }[];
}

export async function getExpensesDailyAmountInPeriod({
  from,
  to,
}: GetExpensesDailyAmountInPeriodQuery) {
  const response = await api.get<GetExpensesDailyAmountInPeriodResponse>(
    "/expenses/daily-amount-period",
    {
      params: {
        from,
        to,
      },
    },
  );

  return response.data;
}
