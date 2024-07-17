import { expect, test } from "@playwright/test";

test("display daily expenses amount metrics", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(
    page.locator("span").filter({ hasText: "R$ 500,00" }),
  ).toBeVisible();
  await expect(page.getByText("+10% em relação a ontem")).toBeVisible();
});

test("display monthly expenses amount metrics", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(
    page.locator("span").filter({ hasText: "R$ 2.000,00" }),
  ).toBeVisible();
  await expect(page.getByText("-20% em relação ao mês passado")).toBeVisible();
});

test("display total expenses amount metrics", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByText("R$ 5.000,00")).toBeVisible();
});
