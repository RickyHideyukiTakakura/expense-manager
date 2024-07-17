import { expect, test } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByLabel("Seu nome").fill("John Doe");
  await page.getByLabel("Seu email").fill("johndoe@example.com");

  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Usuário cadastrado com sucesso!");

  await expect(toast).toBeVisible();
});

test("sign up with error", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByLabel("Seu nome").fill("Invalid name");
  await page.getByLabel("Seu email").fill("johndoe@example.com");

  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Erro ao cadastrar usuário");

  await expect(toast).toBeVisible();
});

test("navigate to sign in page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Fazer login" }).click();

  expect(page.url()).toContain("/sign-in");
});
