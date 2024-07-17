import { http, HttpResponse } from "msw";

import { UpdateExpenseBody } from "../update-expense";

export const updateExpenseMock = http.put<never, UpdateExpenseBody>(
  "/expenses/:id",
  async ({ request }) => {
    const { id, description } = await request.json();

    if (description === "Description" && id) {
      return new HttpResponse(null, {
        status: 200,
      });
    }

    return new HttpResponse(null, {
      status: 401,
    });
  },
);
