import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

type Props = ComponentProps<"button"> & {
  variant?: Variant;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:brightness-105",
  secondary: "border border-line bg-node text-ink hover:border-line-strong",
};

export function Button({
  variant = "primary",
  type = "button",
  className = "",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={`flex h-12 items-center justify-center gap-2.5 rounded-[10px] text-[15px] leading-[1.2] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
