import { api } from "@/lib/axios";

export interface GetExpenseTotalAmountResponse {
  totalAmount: number;
}

export async function getExpensesTotalAmount() {
  const response = await api.get<GetExpenseTotalAmountResponse>(
    "/expenses/total-amount",
  );

  return response.data;
}
