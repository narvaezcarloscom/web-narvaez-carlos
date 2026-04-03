export default function DiagonalSlash({ className = "" }: { className?: string }) {
  return (
    <svg
      width="40"
      height="20"
      viewBox="0 0 40 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="20"
        x2="40"
        y2="0"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
