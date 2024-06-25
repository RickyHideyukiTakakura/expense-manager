import { api } from "@/lib/axios";

export interface GetExpensesQuery {
  pageIndex?: number | null;
}

export interface GetExpensesResponse {
  expenses: {
    id: string;
    description: string;
    category: string;
    payment: string;
    price: number;
    createdAt: string;
  }[];
  totalItems: number;
}

export async function getExpenses({ pageIndex }: GetExpensesQuery) {
  const response = await api.get<GetExpensesResponse>("/expenses", {
    params: {
      pageIndex,
    },
  });

  return response.data;
}
