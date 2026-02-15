interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-neutral-500 max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
