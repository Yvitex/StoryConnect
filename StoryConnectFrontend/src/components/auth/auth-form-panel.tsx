import type { ReactNode } from "react";

type Props = {
  footnote: string;
  children: ReactNode;
};

export function AuthFormPanel({ footnote, children }: Props) {
  return (
    <section className="flex min-h-screen flex-col items-center px-6 pt-16">
      <div className="my-auto flex w-full max-w-[400px] flex-col gap-6">
        {children}
      </div>

      <p className="pt-8 pb-7 text-center text-[13px] leading-normal text-ink-dim">
        {footnote}
      </p>
    </section>
  );
}
