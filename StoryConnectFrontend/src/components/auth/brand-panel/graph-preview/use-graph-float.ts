import { useEffect, type RefObject } from "react";
import { floatX, floatY } from "./float-motion";
import { previewEdges, previewNodes } from "./preview-data";

const FRAME_INTERVAL_MS = 1000 / 30;

function translate(element: HTMLElement, x: number, y: number) {
  element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function moveLine(
  line: SVGLineElement,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  line.setAttribute("x1", `${x1}`);
  line.setAttribute("y1", `${y1}`);
  line.setAttribute("x2", `${x2}`);
  line.setAttribute("y2", `${y2}`);
}

export function useGraphFloat(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodeIndex = new Map(previewNodes.map((node, i) => [node.id, i]));

    const nodes = previewNodes.map((node) => ({
      config: node.float,
      element: root.querySelector<HTMLElement>(`[data-float-node="${node.id}"]`),
    }));

    const edges = previewEdges.flatMap((edge) => {
      const from = nodeIndex.get(edge.from);
      const to = nodeIndex.get(edge.to);
      if (from === undefined || to === undefined) return [];

      return {
        from,
        to,
        t: edge.labelAt ?? 0.5,
        line: root.querySelector<SVGLineElement>(`[data-float-line="${edge.id}"]`),
        label: root.querySelector<HTMLElement>(`[data-float-label="${edge.id}"]`),
      };
    });

    const dx = new Float64Array(nodes.length);
    const dy = new Float64Array(nodes.length);

    const paint = (seconds: number) => {
      for (let i = 0; i < nodes.length; i++) {
        const { config, element } = nodes[i];
        dx[i] = floatX(config, seconds);
        dy[i] = floatY(config, seconds);
        if (element) translate(element, dx[i], dy[i]);
      }

      for (const { from, to, t, line, label } of edges) {
        if (line) {
          moveLine(
            line,
            previewNodes[from].x + dx[from],
            previewNodes[from].y + dy[from],
            previewNodes[to].x + dx[to],
            previewNodes[to].y + dy[to],
          );
        }
        if (label) {
          translate(
            label,
            dx[from] + (dx[to] - dx[from]) * t,
            dy[from] + (dy[to] - dy[from]) * t,
          );
        }
      }
    };

    const reset = () => {
      for (const { element } of nodes) {
        if (element) element.style.transform = "";
      }
      for (const { from, to, line, label } of edges) {
        if (line) {
          moveLine(
            line,
            previewNodes[from].x,
            previewNodes[from].y,
            previewNodes[to].x,
            previewNodes[to].y,
          );
        }
        if (label) label.style.transform = "";
      }
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frameId = 0;
    let startedAt: number | undefined;
    let lastPaint = 0;

    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick);
      if (now - lastPaint < FRAME_INTERVAL_MS) return;

      lastPaint = now;
      startedAt ??= now;
      paint((now - startedAt) / 1000);
    };

    const sync = () => {
      cancelAnimationFrame(frameId);
      startedAt = undefined;

      if (visible && !reducedMotion.matches) {
        frameId = requestAnimationFrame(tick);
      } else {
        reset();
      }
    };

    const observer = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });

    observer.observe(root);
    reducedMotion.addEventListener("change", sync);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
    };
  }, [rootRef]);
}
