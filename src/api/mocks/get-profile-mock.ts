import { http, HttpResponse } from "msw";

import { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      user: {
        id: "user-id",
        email: "johndoe@example.com",
        name: "John Doe",
      },
    });
  },
);
