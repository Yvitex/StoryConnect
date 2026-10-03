import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RegisterPanel } from "./register-panel";

describe("RegisterPanel", () => {
  it("render_default_showsHeadingAndAllFormFields", () => {
    render(<RegisterPanel />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Start your first story" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "autocomplete",
      "new-password",
    );
    expect(screen.getByRole("checkbox", { name: /I agree/ })).toBeRequired();
    expect(
      screen.getByRole("button", { name: "Create account" }),
    ).toHaveAttribute("type", "submit");
  });

  it("render_default_linksToTermsPrivacyAndSignIn", () => {
    render(<RegisterPanel />);

    expect(screen.getByRole("link", { name: "Terms" })).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("render_default_offersGoogleAndGithub", () => {
    render(<RegisterPanel />);

    expect(screen.getByRole("button", { name: "Google" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "GitHub" })).toBeInTheDocument();
  });
});
