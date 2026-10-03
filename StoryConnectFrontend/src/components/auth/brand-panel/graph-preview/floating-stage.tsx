"use client";

import { useRef, type ReactNode } from "react";
import { STAGE_HEIGHT, STAGE_WIDTH } from "./preview-data";
import { useGraphFloat } from "./use-graph-float";

type Props = {
  children: ReactNode;
};

export function FloatingStage({ children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGraphFloat(rootRef);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="relative left-1/2 -translate-x-1/2"
      style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}
    >
      {children}
    </div>
  );
}
