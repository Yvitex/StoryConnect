import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrandCaption } from "./brand-caption";

describe("BrandCaption", () => {
  it("render_withProps_rendersTitleAndDescription", () => {
    render(<BrandCaption title="A headline" description="Some supporting text" />);

    expect(
      screen.getByRole("heading", { name: "A headline" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Some supporting text")).toBeInTheDocument();
  });
});
