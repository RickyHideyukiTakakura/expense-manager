import { http, HttpResponse } from "msw";

import { RegisterUserBody } from "../register-user";

export const registerUserMock = http.post<never, RegisterUserBody>(
  "/users",
  async ({ request }) => {
    const { name } = await request.json();

    if (name === "John Doe") {
      return new HttpResponse(null, {
        status: 200,
      });
    }

    return new HttpResponse(null, {
      status: 400,
    });
  },
);
