import type { Metadata } from "next";
import { LoginPanel } from "./_components/login-panel";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Story Connect and pick up your story.",
};

export default function LoginPage() {
  return <LoginPanel />;
}
