type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-[0.16em] text-teal-700 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-neutral-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-neutral-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
