import Link from "next/link";

export function SignInPrompt() {
  return (
    <p className="flex items-center justify-center gap-1.5 text-[13px] leading-normal text-ink-muted">
      Already have an account?
      <Link
        href="/login"
        className="font-medium text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-accent"
      >
        Sign in
      </Link>
    </p>
  );
}
