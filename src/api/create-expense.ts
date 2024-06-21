import { api } from "@/lib/axios";

export interface CreateExpenseBody {
  description: string;
  category: string;
  payment: string;
  price: number;
  createdAt?: Date;
}

export async function createExpense({
  description,
  category,
  payment,
  price,
  createdAt,
}: CreateExpenseBody) {
  await api.post("/expenses", {
    description,
    category,
    payment,
    price,
    createdAt,
  });
}
