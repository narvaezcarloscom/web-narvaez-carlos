export default function DiagonalSlash({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
}) {
  const dimensions = {
    sm: { width: 24, height: 10.69 },
    md: { width: 40, height: 17.81 },
    lg: { width: 64, height: 28.50 },
    hero: { width: 96, height: 42.75 },
  };

  const { width, height } = dimensions[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="0"
        y1={height}
        x2={width}
        y2="0"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
