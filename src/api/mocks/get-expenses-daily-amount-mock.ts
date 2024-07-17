import { http, HttpResponse } from "msw";

import { GetExpensesDailyAmountResponse } from "../get-expenses-daily-amount";

export const getExpensesDailyAmountMock = http.get<
  never,
  never,
  GetExpensesDailyAmountResponse
>("/expenses/daily-amount", () => {
  return HttpResponse.json({
    dailyExpenseAmount: 500,
    diffFromYesterday: 10,
  });
});
