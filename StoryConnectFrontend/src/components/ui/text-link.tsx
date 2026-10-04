import Link from "next/link";
import type { ComponentProps } from "react";

type Tone = "accent" | "ink";

type Props = ComponentProps<typeof Link> & {
  tone?: Tone;
};

const TONE_CLASSES: Record<Tone, string> = {
  accent: "font-medium text-accent",
  ink: "text-ink",
};

export function TextLink({ tone = "accent", className = "", ...props }: Props) {
  return (
    <Link
      className={`${TONE_CLASSES[tone]} underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-accent ${className}`}
      {...props}
    />
  );
}
