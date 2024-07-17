import { setupWorker } from "msw/browser";

import { env } from "@/env";

import { createExpenseMock } from "./create-expense-mock";
import { deleteExpenseMock } from "./delete-expense-mock";
import { getExpensesDailyAmountInPeriodMock } from "./get-expenses-daily-amount-in-period-mock";
import { getExpensesDailyAmountMock } from "./get-expenses-daily-amount-mock";
import { getExpensesMock } from "./get-expenses-mock";
import { getExpensesMonthlyAmountMock } from "./get-expenses-monthly-amount-mock";
import { getExpensesTotalAmountMock } from "./get-expenses-total-amount-mock";
import { getPopularCategoriesMock } from "./get-popular-categories-mock";
import { getProfileMock } from "./get-profile-mock";
import { registerUserMock } from "./register-user-mock";
import { signInMock } from "./sign-in-mock";
import { updateExpenseMock } from "./update-expense-mock";

export const worker = setupWorker(
  registerUserMock,
  signInMock,
  getProfileMock,
  getExpensesDailyAmountMock,
  getExpensesMonthlyAmountMock,
  getExpensesTotalAmountMock,
  getExpensesDailyAmountInPeriodMock,
  getPopularCategoriesMock,
  getExpensesMock,
  createExpenseMock,
  deleteExpenseMock,
  updateExpenseMock,
);

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }

  await worker.start();
}
