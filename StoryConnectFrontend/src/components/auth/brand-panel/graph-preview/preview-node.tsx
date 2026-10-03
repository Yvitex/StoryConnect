import type { NodeKind, PreviewNodeData } from "./preview-data";

type Props = {
  node: PreviewNodeData;
};

const DOT_COLOR: Record<NodeKind, string> = {
  character: "bg-type-character",
  object: "bg-type-object",
  location: "bg-type-location",
  scene: "bg-type-scene",
  event: "bg-type-event",
  lore: "bg-type-lore",
};

export function PreviewNode({ node }: Props) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: node.x, top: node.y }}
    >
      <div
        data-float-node={node.id}
        className={`flex h-[37px] items-center gap-2 rounded-full border bg-node pr-3.5 pl-3 whitespace-nowrap shadow-[0_6px_18px_rgba(0,0,0,0.35)] will-change-transform ${
          node.highlighted ? "border-accent" : "border-line-strong"
        }`}
      >
        <span
          className={`size-2.5 shrink-0 rounded-full ${DOT_COLOR[node.kind]}`}
        />
        <span className="text-[13px] leading-[1.4] font-medium text-ink">
          {node.name}
        </span>
        <span className="font-mono text-[10.5px] leading-[1.3] tracking-[0.04em] text-ink-dim uppercase">
          {node.kind}
        </span>
      </div>
    </div>
  );
}
