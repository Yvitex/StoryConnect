import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LoginPanel } from "./login-panel";

describe("LoginPanel", () => {
  it("render_default_showsHeadingAndFields", () => {
    render(<LoginPanel />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Welcome back" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("Password")).toBeRequired();
    expect(
      screen.getByRole("button", { name: "Sign in" }),
    ).toHaveAttribute("type", "submit");
  });

  it("render_default_usesLoginAutocompleteHints", () => {
    render(<LoginPanel />);

    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "autocomplete",
      "username",
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "autocomplete",
      "current-password",
    );
  });

  it("render_default_doesNotEnforcePasswordPolicyOnLogin", () => {
    render(<LoginPanel />);

    expect(screen.getByLabelText("Password")).not.toHaveAttribute("minlength");
  });

  it("render_default_keepsMeSignedInCheckedByDefault", () => {
    render(<LoginPanel />);

    expect(
      screen.getByRole("checkbox", { name: "Keep me signed in" }),
    ).toBeChecked();
  });

  it("click_keepMeSignedIn_uncheckIt", async () => {
    const user = userEvent.setup();
    render(<LoginPanel />);

    await user.click(screen.getByText("Keep me signed in"));

    expect(
      screen.getByRole("checkbox", { name: "Keep me signed in" }),
    ).not.toBeChecked();
  });

  it("render_default_linksToForgotPasswordAndRegister", () => {
    render(<LoginPanel />);

    expect(screen.getByRole("link", { name: "Forgot password?" })).toHaveAttribute(
      "href",
      "/forgot-password",
    );
    expect(screen.getByRole("link", { name: "Create an account" })).toHaveAttribute(
      "href",
      "/register",
    );
  });
});
