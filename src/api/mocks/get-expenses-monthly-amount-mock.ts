import { http, HttpResponse } from "msw";

import { GetExpensesMonthlyAmountResponse } from "../get-expenses-monthly-amount";

export const getExpensesMonthlyAmountMock = http.get<
  never,
  never,
  GetExpensesMonthlyAmountResponse
>("/expenses/monthly-amount", () => {
  return HttpResponse.json({
    currentMonthlyExpenseAmount: 2000,
    diffFromLastMonth: -20,
  });
});
