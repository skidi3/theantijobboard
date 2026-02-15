interface SectionDividerProps {
  variant?: "line" | "dots" | "gradient";
}

export function SectionDivider({ variant = "line" }: SectionDividerProps) {
  if (variant === "dots") {
    return (
      <div className="flex items-center justify-center gap-2 py-2">
        <span className="w-1 h-1 rounded-full bg-border-dark" />
        <span className="w-1 h-1 rounded-full bg-border-dark" />
        <span className="w-1 h-1 rounded-full bg-border-dark" />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-border-dark to-transparent" />
    );
  }

  return <div className="h-px w-16 mx-auto bg-border-dark" />;
}
