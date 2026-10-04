type Props = {
  title: string;
  description: string;
};

export function BrandCaption({ title, description }: Props) {
  return (
    <div className="max-w-[560px]">
      <h2 className="font-serif text-[32px] leading-[1.18] font-normal tracking-[-0.015em] text-ink">
        {title}
      </h2>
      <p className="mt-3.5 text-[15px] leading-normal text-ink-muted">
        {description}
      </p>
    </div>
  );
}
