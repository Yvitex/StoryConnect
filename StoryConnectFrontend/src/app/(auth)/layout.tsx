import type { ReactNode } from "react";
import { BrandPanel } from "@/components/auth/brand-panel/brand-panel";

type Props = {
  children: ReactNode;
  caption: ReactNode;
};

export default function AuthLayout({ children, caption }: Props) {
  return (
    <main className="grid min-h-screen flex-1 xl:grid-cols-2">
      <BrandPanel caption={caption} />
      {children}
    </main>
  );
}
