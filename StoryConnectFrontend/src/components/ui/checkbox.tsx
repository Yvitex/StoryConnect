import type { ComponentProps, ReactNode } from "react";

type Props = Omit<ComponentProps<"input">, "type" | "children"> & {
  label: ReactNode;
};

export function Checkbox({ label, ...input }: Props) {
  return (
    <label className="flex items-center gap-2 text-[13px] leading-normal text-ink-muted">
      <span className="relative grid size-4 shrink-0 place-items-center">
        <input
          type="checkbox"
          className="peer absolute inset-0 size-4 cursor-pointer appearance-none rounded-sm border-[1.5px] border-line-strong bg-field transition checked:border-accent checked:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          {...input}
        />
        <svg
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none relative hidden size-2.5 text-on-accent peer-checked:block"
        >
          <path d="M1.5 5.2L4 7.5L8.5 2.5" />
        </svg>
      </span>
      {label}
    </label>
  );
}
