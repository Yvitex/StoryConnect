type Props = {
  className?: string;
};

export function LogoGlyph({ className }: Props) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M20 6L7 8L14 21L20 6ZM20 6L23 17"
        stroke="#e8b04b"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="8" r="3.2" fill="#e8b04b" />
      <circle cx="20" cy="6" r="2.6" fill="#f1ede4" />
      <circle cx="14" cy="21" r="3.6" fill="#e8785b" />
      <circle cx="23" cy="17" r="2.2" fill="#6c9bf2" />
    </svg>
  );
}
