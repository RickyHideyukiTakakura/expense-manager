import { http, HttpResponse } from "msw";

import { getPopularCategoriesResponse } from "../get-popular-categories";

export const getPopularCategoriesMock = http.get<
  never,
  never,
  getPopularCategoriesResponse
>("/expenses/popular-categories", () => {
  return HttpResponse.json({
    categories: [
      {
        category: "Categoria 01",
        amount: 5,
      },
      {
        category: "Categoria 02",
        amount: 2,
      },
      {
        category: "Categoria 03",
        amount: 1,
      },
      {
        category: "Categoria 04",
        amount: 10,
      },
      {
        category: "Categoria 05",
        amount: 7,
      },
    ],
  });
});
