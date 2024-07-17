import { http, HttpResponse } from "msw";

import { DeleteExpenseParams } from "../delete-expense";

export const deleteExpenseMock = http.delete<DeleteExpenseParams, never, never>(
  "/expenses/:id",
  async ({ params }) => {
    if (params.id === "error-id") {
      return new HttpResponse(null, {
        status: 400,
      });
    }

    return new HttpResponse(null, {
      status: 200,
    });
  },
);
