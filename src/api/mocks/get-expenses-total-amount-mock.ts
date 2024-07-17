import { http, HttpResponse } from "msw";

import { GetExpenseTotalAmountResponse } from "../get-expenses-total-amount";

export const getExpensesTotalAmountMock = http.get<
  never,
  never,
  GetExpenseTotalAmountResponse
>("/expenses/total-amount", () => {
  return HttpResponse.json({
    totalAmount: 5000,
  });
});
