"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordField } from "@/components/ui/password-field";
import { TextField } from "@/components/ui/text-field";
import { TextLink } from "@/components/ui/text-link";

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

export function LoginForm() {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={256}
          required
        />
        <PasswordField
          label="Password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          maxLength={128}
          required
        />
        <div className="flex items-center justify-between">
          <Checkbox name="remember" defaultChecked label="Keep me signed in" />
          <TextLink href="/forgot-password" className="text-[13px] leading-[1.4]">
            Forgot password?
          </TextLink>
        </div>
      </div>

      <Button type="submit">Sign in</Button>
    </form>
  );
}
