import type { FloatConfig } from "./float-motion";

export type NodeKind =
  | "character"
  | "object"
  | "location"
  | "scene"
  | "event"
  | "lore";

export type PreviewNodeData = {
  id: string;
  name: string;
  kind: NodeKind;
  x: number;
  y: number;
  highlighted?: boolean;
  float: FloatConfig;
};

export type PreviewEdgeData = {
  id: string;
  from: string;
  to: string;
  label: string;
  labelAt?: number;
  highlighted?: boolean;
};

export const STAGE_WIDTH = 720;
export const STAGE_HEIGHT = 480;

export const previewNodes: PreviewNodeData[] = [
  { id: "mara", name: "Mara", kind: "character", x: 180, y: 100, float: { duration: 7, delay: -1, x: 3, y: 6 } },
  { id: "red-crown", name: "The Red Crown", kind: "object", x: 470, y: 50, float: { duration: 8, delay: -4, x: 3, y: 5 } },
  { id: "ruins", name: "Ruins of Vel", kind: "location", x: 560, y: 218, float: { duration: 6.5, delay: -2, x: 3, y: 7 } },
  {
    id: "betrayal",
    name: "Ch. 8 · The Betrayal",
    kind: "scene",
    x: 300,
    y: 280,
    highlighted: true,
    float: { duration: 9, delay: -6, x: 2, y: 5 },
  },
  { id: "old-pact", name: "The Old Pact", kind: "lore", x: 150, y: 440, float: { duration: 7.5, delay: -3, x: 3, y: 6 } },
  { id: "kings-oath", name: "The King's Oath", kind: "event", x: 500, y: 420, float: { duration: 8.5, delay: -5, x: 3, y: 7 } },
];

export const previewEdges: PreviewEdgeData[] = [
  { id: "seeks", from: "mara", to: "red-crown", label: "seeks" },
  { id: "hidden-at", from: "red-crown", to: "ruins", label: "hidden at" },
  { id: "appears-in", from: "mara", to: "betrayal", label: "appears in" },
  { id: "located-at", from: "betrayal", to: "ruins", label: "located at" },
  {
    id: "foreshadows",
    from: "old-pact",
    to: "betrayal",
    label: "foreshadows",
    highlighted: true,
  },
  { id: "causes", from: "betrayal", to: "kings-oath", label: "causes" },
  {
    id: "reveals",
    from: "kings-oath",
    to: "red-crown",
    label: "reveals",
    labelAt: 0.27,
  },
];
