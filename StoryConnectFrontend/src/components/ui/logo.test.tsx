import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./logo";

describe("Logo", () => {
  it("renders_default_showsWordmark", () => {
    render(<Logo />);

    expect(screen.getByText("Story Connect")).toBeInTheDocument();
  });
});
