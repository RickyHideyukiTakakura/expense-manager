import { expect, test } from "@playwright/test";

test("list expenses", async ({ page }) => {
  await page.goto("/expenses", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("cell", { name: "description-1", exact: true }),
  ).toBeVisible();

  await expect(
    page.getByRole("cell", { name: "description-10", exact: true }),
  ).toBeVisible();
});

test("paginate expenses", async ({ page }) => {
  await page.goto("/expenses", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Próxima página" }).click();

  await expect(
    page.getByRole("cell", { name: "description-11", exact: true }),
  ).toBeVisible();

  await expect(
    page.getByRole("cell", { name: "description-20", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Última página" }).click();

  await expect(
    page.getByRole("cell", { name: "description-51", exact: true }),
  ).toBeVisible();

  await expect(
    page.getByRole("cell", { name: "description-60", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Página anterior" }).click();

  await expect(
    page.getByRole("cell", { name: "description-41", exact: true }),
  ).toBeVisible();

  await expect(
    page.getByRole("cell", { name: "description-50", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Primeira página" }).click();

  await expect(
    page.getByRole("cell", { name: "description-1", exact: true }),
  ).toBeVisible();

  await expect(
    page.getByRole("cell", { name: "description-10", exact: true }),
  ).toBeVisible();
});

test("filter expenses by description", async ({ page }) => {
  await page.goto("/expenses", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Descrição").fill("description-11");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await expect(
    page.getByRole("cell", { name: "description-11" }),
  ).toBeVisible();
});

test("filter expenses by category", async ({ page }) => {
  await page.goto("/expenses", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Categoria").fill("category-11");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await expect(page.getByRole("cell", { name: "category-11" })).toBeVisible();
});

test("filter expenses by payment method", async ({ page }) => {
  await page.goto("/expenses", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Método de pagamento").fill("Cartão de Crédito");
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await expect(page.getByText("Total de 15 item(s)")).toBeVisible();
});

test("filter expenses by date", async ({ page }) => {
  await page.goto("/expenses", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pick a date" }).click();
  await page.getByRole("gridcell", { name: "10" }).click();
  await page.getByRole("button", { name: "Filtrar resultados" }).click();

  await expect(page.getByText("Total de 60 item(s)")).toBeVisible();
});

test("create a new expense", async ({ page }) => {
  await page.goto("/expenses", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Adicionar" }).click();

  await page.getByLabel("Descrição").fill("Description");
  await page.getByLabel("Categoria").fill("Category");
  await page.getByLabel("Método de pagamento").fill("Payment");
  await page.getByLabel("Preço").fill("20");

  await page.getByRole("button", { name: "Pick a date" }).click();
  await page.getByRole("gridcell", { name: "17" }).click();

  await page.getByRole("button", { name: "Adicionar" }).click();

  const toast = page.getByText("Despesa cadastrada com sucesso!");

  await expect(toast).toBeVisible();
});
