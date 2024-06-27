import { api } from "@/lib/axios";

export interface GetExpensesQuery {
  pageIndex?: number | null;
  description?: string | null;
  category?: string | null;
  payment?: string | null;
  createdAt?: Date | null;
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

export async function getExpenses({
  pageIndex,
  description,
  category,
  payment,
  createdAt,
}: GetExpensesQuery) {
  const response = await api.get<GetExpensesResponse>("/expenses", {
    params: {
      pageIndex,
      description,
      category,
      payment,
      createdAt,
    },
  });

  return response.data;
}
