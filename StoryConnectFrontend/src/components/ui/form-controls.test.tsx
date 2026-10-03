import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { PasswordField } from "./password-field";
import { TextField } from "./text-field";

describe("TextField", () => {
  it("render_withLabel_associatesLabelWithInput", () => {
    render(<TextField label="Email" name="email" />);

    expect(screen.getByLabelText("Email")).toHaveAttribute("name", "email");
  });

  it("render_withHelper_describesInputWithHelperText", () => {
    render(<TextField label="Email" helper="We never share it" />);

    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(
      "We never share it",
    );
  });

  it("render_withoutHelper_hasNoDescription", () => {
    render(<TextField label="Email" />);

    expect(screen.getByLabelText("Email")).not.toHaveAttribute(
      "aria-describedby",
    );
  });
});

describe("PasswordField", () => {
  it("click_toggle_showsAndHidesPassword", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="Password" />);
    const input = screen.getByLabelText("Password");

    expect(input).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("render_toggle_doesNotSubmitTheForm", () => {
    render(<PasswordField label="Password" />);

    expect(screen.getByRole("button", { name: "Show password" })).toHaveAttribute(
      "type",
      "button",
    );
  });
});

describe("Checkbox", () => {
  it("click_label_togglesCheckbox", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="I agree" />);

    await user.click(screen.getByText("I agree"));

    expect(screen.getByRole("checkbox", { name: "I agree" })).toBeChecked();
  });
});

describe("Button", () => {
  it("render_default_isNotASubmitButton", () => {
    render(<Button>Go</Button>);

    expect(screen.getByRole("button", { name: "Go" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("render_typeSubmit_isASubmitButton", () => {
    render(<Button type="submit">Go</Button>);

    expect(screen.getByRole("button", { name: "Go" })).toHaveAttribute(
      "type",
      "submit",
    );
  });
});
