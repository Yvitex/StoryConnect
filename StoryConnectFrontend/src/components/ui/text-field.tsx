import { useId, type ComponentProps, type ReactNode } from "react";

type Props = ComponentProps<"input"> & {
  label: string;
  helper?: string;
  trailing?: ReactNode;
};

export function TextField({ label, helper, trailing, id, ...input }: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className="text-[13px] leading-[1.4] font-medium text-ink-muted"
      >
        {label}
      </label>

      <div className="flex h-12 items-center gap-2.5 rounded-[10px] border border-line bg-field pr-3.5 pl-4 transition focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
        <input
          id={inputId}
          aria-describedby={helper ? helperId : undefined}
          className="min-w-0 flex-1 bg-transparent text-[15px] leading-normal text-ink outline-none placeholder:text-ink-dim"
          {...input}
        />
        {trailing}
      </div>

      {helper && (
        <p id={helperId} className="text-[13px] leading-normal text-ink-dim">
          {helper}
        </p>
      )}
    </div>
  );
}
