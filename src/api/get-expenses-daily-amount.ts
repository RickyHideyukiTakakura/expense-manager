import { api } from "@/lib/axios";

export interface GetExpensesDailyAmountResponse {
  dailyExpenseAmount: number;
  diffFromYesterday: number;
}

export async function getExpensesDailyAmount() {
  const response = await api.get<GetExpensesDailyAmountResponse>(
    "/expenses/daily-amount",
  );

  return response.data;
}
