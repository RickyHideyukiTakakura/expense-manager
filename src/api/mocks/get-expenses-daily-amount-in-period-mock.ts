import { http, HttpResponse } from "msw";
import { GetExpensesDailyAmountInPeriodResponse } from "../get-expenses-daily-amount-in-period";

export const getExpensesDailyAmountInPeriodMock = http.get<
  never,
  never,
  GetExpensesDailyAmountInPeriodResponse
>("/expenses/daily-amount-period", () => {
  return HttpResponse.json({
    expensesAmountInPeriod: [
      {
        date: "01/01/2024",
        amount: 800,
      },
      {
        date: "02/01/2024",
        amount: 1000,
      },
      {
        date: "03/01/2024",
        amount: 2000,
      },
      {
        date: "04/01/2024",
        amount: 200,
      },
      {
        date: "05/01/2024",
        amount: 500,
      },
      {
        date: "06/01/2024",
        amount: 100,
      },
      {
        date: "07/01/2024",
        amount: 700,
      },
    ],
  });
});
