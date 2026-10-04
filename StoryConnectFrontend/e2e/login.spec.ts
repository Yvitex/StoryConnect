import { expect, test } from "@playwright/test";

test.describe("login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/login");
  });

  test("shows the heading, fields and call to action", async ({ page }) => {
    await expect(page).toHaveTitle(/Sign in/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Welcome back" }),
    ).toBeVisible();
    await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Forgot password?" })).toBeVisible();
  });

  test("shows the login caption in the brand panel", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "See your whole story, and understand how every part connects.",
      }),
    ).toBeVisible();
  });

  test("keeps me signed in is checked by default", async ({ page }) => {
    await expect(
      page.getByRole("checkbox", { name: "Keep me signed in" }),
    ).toBeChecked();
  });

  test("blocks submit until email and password are provided", async ({ page }) => {
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByLabel("Email", { exact: true })).toBeFocused();
  });

  test("does not leak credentials into the URL on submit", async ({ page }) => {
    await page.getByLabel("Email", { exact: true }).fill("mara@example.com");
    await page.getByLabel("Password", { exact: true }).fill("not-a-real-password");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/login$/);
  });

  test("toggles password visibility", async ({ page }) => {
    const password = page.getByLabel("Password", { exact: true });

    await page.getByRole("button", { name: "Show password" }).click();

    await expect(password).toHaveAttribute("type", "text");
  });
});

test.describe("switching between login and register", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test("swaps the caption but keeps the brand panel mounted", async ({ page }) => {
    await page.goto("/login");
    const panelNode = page.locator("[data-float-node]").first();
    await panelNode.evaluate((element) => {
      element.setAttribute("data-marker", "same-element");
    });

    await page.getByRole("link", { name: "Create an account" }).click();
    await expect(page).toHaveURL(/\/register$/);

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Every scene, character, and secret — connected.",
      }),
    ).toBeVisible();
    await expect(page.locator('[data-float-node][data-marker="same-element"]')).toHaveCount(1);
  });

  test("register links back to login with the right caption", async ({ page }) => {
    await page.goto("/register");

    await page.getByRole("link", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Welcome back" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "See your whole story, and understand how every part connects.",
      }),
    ).toBeVisible();
  });

  test("hard reload on login still renders the right caption", async ({ page }) => {
    await page.goto("/login");
    await page.reload();

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "See your whole story, and understand how every part connects.",
      }),
    ).toBeVisible();
  });
});
