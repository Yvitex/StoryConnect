"use client";

import { useState, type ComponentProps } from "react";
import { EyeIcon } from "./icons/eye-icon";
import { TextField } from "./text-field";

type Props = Omit<ComponentProps<typeof TextField>, "type" | "trailing">;

export function PasswordField(props: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="-mr-1.5 grid size-7 place-items-center rounded-md text-ink-dim transition hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
        >
          <EyeIcon crossed={visible} className="size-[18px]" />
        </button>
      }
    />
  );
}
