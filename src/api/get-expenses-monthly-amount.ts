import { api } from "@/lib/axios";

export interface GetExpensesMonthlyAmountResponse {
  currentMonthlyExpenseAmount: number;
  diffFromLastMonth: number;
}

export async function getExpensesMonthlyAmount() {
  const response = await api.get<GetExpensesMonthlyAmountResponse>(
    "/expenses/monthly-amount",
  );

  return response.data;
}
