import type { Metadata } from "next";
import { RegisterPanel } from "./_components/register-panel";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a Story Connect account and start mapping your story.",
};

export default function RegisterPage() {
  return <RegisterPanel />;
}
