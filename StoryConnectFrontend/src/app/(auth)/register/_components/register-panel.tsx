import { LabeledDivider } from "@/components/ui/labeled-divider";
import { RegisterForm } from "./register-form";
import { RegisterHeader } from "./register-header";
import { SignInPrompt } from "./sign-in-prompt";
import { SocialSignIn } from "./social-sign-in";

export function RegisterPanel() {
  return (
    <section className="flex min-h-screen flex-col items-center px-6 pt-16">
      <div className="my-auto flex w-full max-w-[400px] flex-col gap-6">
        <RegisterHeader />
        <SocialSignIn />
        <LabeledDivider>or with email</LabeledDivider>
        <RegisterForm />
        <SignInPrompt />
      </div>

      <p className="pt-8 pb-7 text-center text-[13px] leading-normal text-ink-dim">
        Free for the core graph · Optional $1/mo Supporter tier
      </p>
    </section>
  );
}
