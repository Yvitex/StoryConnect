import { expect, test } from "@playwright/test";

test("home redirects to the register page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/register$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Start your first story" }),
  ).toBeVisible();
});
