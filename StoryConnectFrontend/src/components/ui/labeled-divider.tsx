import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function LabeledDivider({ children }: Props) {
  return (
    <div className="flex items-center gap-3 text-[13px] leading-normal text-ink-dim">
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  );
}
