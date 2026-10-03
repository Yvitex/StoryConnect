import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GraphPreview } from "./graph-preview";
import { previewEdges, previewNodes } from "./preview-data";

describe("GraphPreview", () => {
  it("renders_default_renders_every_node_and_edge_label", () => {
    render(<GraphPreview />);

    for (const node of previewNodes) {
      expect(screen.getByText(node.name)).toBeInTheDocument();
    }
    for (const edge of previewEdges) {
      expect(screen.getByText(edge.label)).toBeInTheDocument();
    }
  });

  it("render_default_isHiddenFromAssistiveTech", () => {
    const { container } = render(<GraphPreview />);

    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("data_edges_referenceExistingNodes", () => {
    const ids = new Set(previewNodes.map((node) => node.id));

    for (const edge of previewEdges) {
      expect(ids.has(edge.from)).toBe(true);
      expect(ids.has(edge.to)).toBe(true);
    }
  });
});
