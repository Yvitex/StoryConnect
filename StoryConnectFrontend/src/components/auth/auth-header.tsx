type Props = {
  title: string;
  description: string;
};

export function AuthHeader({ title, description }: Props) {
  return (
    <header className="flex flex-col gap-2.5">
      <h1 className="font-serif text-[44px] leading-[1.1] font-normal tracking-[-0.02em] text-ink">
        {title}
      </h1>
      <p className="text-[15px] leading-normal text-ink-muted">{description}</p>
    </header>
  );
}
