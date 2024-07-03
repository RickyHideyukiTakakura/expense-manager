import { api } from "@/lib/axios";

export interface UpdateExpenseBody {
  id: string;
  description: string;
  category: string;
  payment: string;
  price: number;
  createdAt?: Date;
}

export async function updateExpense({
  id,
  description,
  category,
  payment,
  price,
  createdAt,
}: UpdateExpenseBody) {
  await api.put(`/expenses/${id}`, {
    id,
    description,
    category,
    payment,
    price,
    createdAt,
  });
}
