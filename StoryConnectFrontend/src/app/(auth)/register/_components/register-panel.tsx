import { AuthFormPanel } from "@/components/auth/auth-form-panel";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthSwitchPrompt } from "@/components/auth/auth-switch-prompt";
import { SocialSignIn } from "@/components/auth/social-sign-in";
import { LabeledDivider } from "@/components/ui/labeled-divider";
import { RegisterForm } from "./register-form";

export function RegisterPanel() {
  return (
    <AuthFormPanel footnote="Free for the core graph · Optional $1/mo Supporter tier">
      <AuthHeader
        title="Start your first story"
        description="Bring your characters, lore, and loose ideas."
      />
      <SocialSignIn />
      <LabeledDivider>or with email</LabeledDivider>
      <RegisterForm />
      <AuthSwitchPrompt
        prompt="Already have an account?"
        linkLabel="Sign in"
        href="/login"
      />
    </AuthFormPanel>
  );
}
