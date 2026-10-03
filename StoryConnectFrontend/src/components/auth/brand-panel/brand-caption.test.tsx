import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrandCaption } from "./brand-caption";

describe("BrandCaption", () => {
  it("renders_default_renders_headline_and_supporting_text", () => {
    render(<BrandCaption />);

    expect(
      screen.getByRole("heading", {
        name: "Every scene, character, and secret — connected.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/watch the story take shape/i),
    ).toBeInTheDocument();
  });
});
