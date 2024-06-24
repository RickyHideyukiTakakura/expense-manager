import { api } from "@/lib/axios";

export interface DeleteExpenseParams {
  id: string;
}

export async function deleteExpense({ id }: DeleteExpenseParams) {
  await api.delete(`/expenses/${id}`);
}
