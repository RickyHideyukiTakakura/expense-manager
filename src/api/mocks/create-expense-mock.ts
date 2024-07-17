import { http, HttpResponse } from "msw";

import { CreateExpenseBody } from "../create-expense";

export const createExpenseMock = http.post<never, CreateExpenseBody>(
  "/expenses",
  async ({ request }) => {
    const { description } = await request.json();

    if (description === "Description") {
      return new HttpResponse(null, {
        status: 200,
      });
    }

    return new HttpResponse(null, {
      status: 401,
    });
  },
);
