import { expect, test, type Page } from "@playwright/test";

async function sampleNodeY(page: Page, samples: number, everyMs: number) {
  const node = page.getByText("Mara", { exact: true });
  const ys: number[] = [];

  for (let i = 0; i < samples; i++) {
    const box = await node.boundingBox();
    ys.push(box?.y ?? 0);
    await page.waitForTimeout(everyMs);
  }

  return ys;
}

test.describe("register page brand panel", () => {
  test("shows the logo and headline on wide screens", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/register");

    await expect(page).toHaveTitle(/Create account/);
    await expect(page.getByText("Story Connect")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Every scene, character, and secret — connected.",
      }),
    ).toBeVisible();
  });

  test("hides the brand panel on narrow screens", async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 900 });
    await page.goto("/register");

    await expect(page.getByRole("complementary")).toBeHidden();
  });

  test("graph nodes float gently", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/register");

    const ys = await sampleNodeY(page, 8, 400);

    expect(Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(0.5);
  });

  test("graph nodes stay still when reduced motion is requested", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/register");

    const ys = await sampleNodeY(page, 5, 300);

    expect(Math.max(...ys) - Math.min(...ys)).toBeLessThan(0.01);
  });
});
