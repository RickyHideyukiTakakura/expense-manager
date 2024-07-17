import { http, HttpResponse } from "msw";
import { GetExpensesResponse } from "../get-expenses";

type Expenses = GetExpensesResponse["expenses"];

type ExpensesPayment = GetExpensesResponse["expenses"][number]["payment"];

const payments: ExpensesPayment[] = [
  "Cartão de Crédito",
  "Cartão de Débito",
  "Dinheiro",
  "Pix",
];

const expenses: Expenses = Array.from({ length: 60 }).map((_, i) => {
  return {
    id: `expense-${i + 1}`,
    description: `description-${i + 1}`,
    category: `category-${i + 1}`,
    payment: payments[i % 4],
    price: Math.random() * 100,
    createdAt: new Date(2024, 6, 10).toISOString(),
  };
});

export const getExpensesMock = http.get<never, never, GetExpensesResponse>(
  "/expenses",
  async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const pageIndex = searchParams.get("pageIndex")
      ? Number(searchParams.get("pageIndex"))
      : 0;

    const description = searchParams.get("description");
    const category = searchParams.get("category");
    const payment = searchParams.get("payment");
    const createdAt = searchParams.get("createdAt");

    let filteredExpenses = expenses;

    if (description) {
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.description.includes(description),
      );
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.category.includes(category),
      );
    }

    if (payment) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.payment === payment,
      );
    }

    if (createdAt) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.createdAt === createdAt,
      );
    }

    const paginateExpenses = filteredExpenses.slice(
      (pageIndex - 1) * 10,
      pageIndex * 10,
    );

    return HttpResponse.json({
      expenses: paginateExpenses,
      totalItems: filteredExpenses.length,
    });
  },
);
