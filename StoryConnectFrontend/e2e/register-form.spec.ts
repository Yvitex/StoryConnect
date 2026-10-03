import { expect, test } from "@playwright/test";

test.describe("register form", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/register");
  });

  test("shows the heading, fields and call to action", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "Start your first story" }),
    ).toBeVisible();
    await expect(page.getByLabel("Name", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Create account" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
  });

  test("toggles password visibility", async ({ page }) => {
    const password = page.getByLabel("Password", { exact: true });
    await expect(password).toHaveAttribute("type", "password");

    await page.getByRole("button", { name: "Show password" }).click();
    await expect(password).toHaveAttribute("type", "text");

    await page.getByRole("button", { name: "Hide password" }).click();
    await expect(password).toHaveAttribute("type", "password");
  });

  test("blocks submit until required fields and terms are valid", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(page.getByLabel("Name", { exact: true })).toBeFocused();

    await page.getByLabel("Name", { exact: true }).fill("mara");
    await page.getByLabel("Email", { exact: true }).fill("mara@example.com");
    await page.getByLabel("Password", { exact: true }).fill("short");
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByLabel("Password", { exact: true })).toBeFocused();

    await page.getByLabel("Password", { exact: true }).fill("a-long-enough-pass");
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByRole("checkbox", { name: /I agree/ })).toBeFocused();
  });

  test("does not leak the password into the URL on submit", async ({ page }) => {
    await page.getByLabel("Name", { exact: true }).fill("mara");
    await page.getByLabel("Email", { exact: true }).fill("mara@example.com");
    await page.getByLabel("Password", { exact: true }).fill("a-long-enough-pass");
    await page.getByRole("checkbox", { name: /I agree/ }).check();
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page).toHaveURL(/\/register$/);
  });

  test("is usable on narrow screens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });

    await expect(
      page.getByRole("heading", { level: 1, name: "Start your first story" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Create account" }),
    ).toBeVisible();
  });
});
