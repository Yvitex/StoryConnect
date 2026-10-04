import { TextLink } from "@/components/ui/text-link";

type Props = {
  prompt: string;
  linkLabel: string;
  href: string;
};

export function AuthSwitchPrompt({ prompt, linkLabel, href }: Props) {
  return (
    <p className="flex items-center justify-center gap-1.5 text-[13px] leading-normal text-ink-muted">
      {prompt}
      <TextLink href={href}>{linkLabel}</TextLink>
    </p>
  );
}
