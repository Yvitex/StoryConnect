type Props = {
  id: string;
  label: string;
  x: number;
  y: number;
  highlighted?: boolean;
};

export function PreviewEdgeLabel({
  id,
  label,
  x,
  y,
  highlighted = false,
}: Props) {
  return (
    <span
      data-float-label={id}
      className={`absolute flex h-5 -translate-x-1/2 -translate-y-1/2 items-center rounded-[5px] border bg-canvas px-[7px] font-mono text-[10.5px] leading-[1.3] tracking-[0.04em] whitespace-nowrap will-change-transform ${
        highlighted ? "border-accent text-accent" : "border-line text-ink-muted"
      }`}
      style={{ left: x, top: y }}
    >
      {label}
    </span>
  );
}
