import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";
import { GraphPreview } from "./graph-preview/graph-preview";
import { PanelBackdrop } from "./panel-backdrop";

type Props = {
  caption: ReactNode;
};

export function BrandPanel({ caption }: Props) {
  return (
    <aside className="relative hidden min-h-screen flex-col overflow-hidden border-line bg-panel xl:flex xl:border-r">
      <PanelBackdrop />

      <header className="relative px-12 pt-11">
        <Logo />
      </header>

      <div className="relative mt-7">
        <GraphPreview />
      </div>

      <div className="relative mt-auto px-14 pb-[115px]">{caption}</div>
    </aside>
  );
}
