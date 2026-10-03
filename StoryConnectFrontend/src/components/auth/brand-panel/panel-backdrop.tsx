export function PanelBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-line) 1px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "15px 15px",
        }}
      />
      <div className="absolute top-[110px] left-1/2 h-[500px] w-[600px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(232_176_75/0.09),transparent)]" />
    </div>
  );
}
