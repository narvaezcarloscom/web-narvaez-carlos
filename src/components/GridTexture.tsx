"use client";

export default function GridTexture({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid-pattern"
            width="27.5"
            height="30.5"
            patternUnits="userSpaceOnUse"
          >
            {/* Vertical lines — 18 columns */}
            <line x1="0" y1="0" x2="0" y2="30.5" stroke="currentColor" strokeWidth="0.5" />
            {/* Horizontal lines — 13 rows */}
            <line x1="0" y1="0" x2="27.5" y2="0" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" opacity="0.04" />
      </svg>
    </div>
  );
}
