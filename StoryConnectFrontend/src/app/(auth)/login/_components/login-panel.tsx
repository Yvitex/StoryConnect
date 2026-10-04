import { AuthFormPanel } from "@/components/auth/auth-form-panel";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthSwitchPrompt } from "@/components/auth/auth-switch-prompt";
import { SocialSignIn } from "@/components/auth/social-sign-in";
import { LabeledDivider } from "@/components/ui/labeled-divider";
import { LoginForm } from "./login-form";

export function LoginPanel() {
  return (
    <AuthFormPanel footnote="The core story graph is free. Always.">
      <AuthHeader
        title="Welcome back"
        description="Pick up the thread where you left off."
      />
      <SocialSignIn />
      <LabeledDivider>or with email</LabeledDivider>
      <LoginForm />
      <AuthSwitchPrompt
        prompt="New here?"
        linkLabel="Create an account"
        href="/register"
      />
    </AuthFormPanel>
  );
}
