"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/components/ui/password-field";
import { TextField } from "@/components/ui/text-field";
import { TermsAgreement } from "./terms-agreement";

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

export function RegisterForm() {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <TextField
          label="Name"
          name="username"
          placeholder="What should we call you?"
          autoComplete="username"
          minLength={3}
          maxLength={32}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          maxLength={256}
          required
        />
        <PasswordField
          label="Password"
          name="password"
          placeholder="Create a password"
          helper="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          maxLength={128}
          required
        />
        <TermsAgreement />
      </div>

      <Button type="submit">Create account</Button>
    </form>
  );
}
