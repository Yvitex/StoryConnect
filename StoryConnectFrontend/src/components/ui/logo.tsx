import { LogoGlyph } from "./logo-glyph";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoGlyph className="size-7" />
      <span className="font-serif text-[22px] leading-[1.2] font-semibold tracking-[-0.01em] text-ink">
        Story Connect
      </span>
    </div>
  );
}
