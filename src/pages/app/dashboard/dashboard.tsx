import { ExpenseChart } from "./expense-chart";
import { ExpensesDailyAmountCard } from "./expenses-daily-amount-card";
import { ExpensesMonthlyAmountCard } from "./expenses-monthly-amount-card";
import { ExpensesTotalAmountCard } from "./expenses-total-amount-card";
import { PopularCategoryChart } from "./popular-category-chart";

export function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:items-center">
        <ExpensesDailyAmountCard />

        <ExpensesMonthlyAmountCard />

        <ExpensesTotalAmountCard />
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-9">
        <ExpenseChart />

        <PopularCategoryChart />
      </div>
    </div>
  );
}
