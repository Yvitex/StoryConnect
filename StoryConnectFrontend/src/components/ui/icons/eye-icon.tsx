type Props = {
  crossed?: boolean;
  className?: string;
};

export function EyeIcon({ crossed = false, className }: Props) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M1.5 9C1.5 9 4.125 3.75 9 3.75C13.875 3.75 16.5 9 16.5 9C16.5 9 13.875 14.25 9 14.25C4.125 14.25 1.5 9 1.5 9Z" />
      <circle cx="9" cy="9" r="2.25" />
      {crossed && <path d="M3 15L15 3" />}
    </svg>
  );
}
