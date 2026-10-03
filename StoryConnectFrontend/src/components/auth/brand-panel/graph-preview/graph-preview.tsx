import { FloatingStage } from "./floating-stage";
import { previewEdges, previewNodes } from "./preview-data";
import { PreviewEdgeLabel } from "./preview-edge-label";
import { PreviewEdges } from "./preview-edges";
import { PreviewNode } from "./preview-node";

const nodesById = new Map(previewNodes.map((node) => [node.id, node]));

export function GraphPreview() {
  return (
    <FloatingStage>
      <PreviewEdges edges={previewEdges} nodes={nodesById} />

      {previewEdges.map((edge) => {
        const from = nodesById.get(edge.from);
        const to = nodesById.get(edge.to);
        if (!from || !to) return null;

        const t = edge.labelAt ?? 0.5;
        return (
          <PreviewEdgeLabel
            key={edge.id}
            id={edge.id}
            label={edge.label}
            x={from.x + (to.x - from.x) * t}
            y={from.y + (to.y - from.y) * t}
            highlighted={edge.highlighted}
          />
        );
      })}

      {previewNodes.map((node) => (
        <PreviewNode key={node.id} node={node} />
      ))}
    </FloatingStage>
  );
}
