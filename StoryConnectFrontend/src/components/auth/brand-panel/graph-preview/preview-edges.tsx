import {
  STAGE_HEIGHT,
  STAGE_WIDTH,
  type PreviewEdgeData,
  type PreviewNodeData,
} from "./preview-data";

type Props = {
  edges: PreviewEdgeData[];
  nodes: Map<string, PreviewNodeData>;
};

export function PreviewEdges({ edges, nodes }: Props) {
  return (
    <svg
      viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
      className="absolute inset-0 size-full"
      fill="none"
    >
      {edges.map((edge) => {
        const from = nodes.get(edge.from);
        const to = nodes.get(edge.to);
        if (!from || !to) return null;

        return (
          <line
            key={edge.id}
            data-float-line={edge.id}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            className={edge.highlighted ? "stroke-accent" : "stroke-line-strong"}
            strokeWidth={1.5}
            strokeDasharray={edge.highlighted ? "8 6" : undefined}
          />
        );
      })}
    </svg>
  );
}
