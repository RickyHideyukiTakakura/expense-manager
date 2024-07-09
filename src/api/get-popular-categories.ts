import { api } from "@/lib/axios";

export interface getPopularCategoriesResponse {
  categories: {
    category: string;
    amount: number;
  }[];
}

export async function getPopularCategories() {
  const response = await api.get<getPopularCategoriesResponse>(
    "/expenses/popular-categories",
  );

  return response.data;
}
