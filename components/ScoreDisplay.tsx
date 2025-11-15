"use client";

import { cn } from "@/lib/utils";

interface ScoreDisplayProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function ScoreDisplay({
  score,
  size = 200,
  strokeWidth = 12,
  className,
}: ScoreDisplayProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score < 60) return "#f75353"; // destructive-100 (red)
    if (score < 80) return "#fbbf24"; // yellow/amber
    return "#49de50"; // success-100 (green)
  };

  const scoreColor = getScoreColor(score);
  const scoreLabel = score < 60 ? "Needs Work" : score < 80 ? "Good" : "Excellent";

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          style={{ width: size, height: size }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-dark-300 opacity-20"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${scoreColor}40)`,
            }}
          />
        </svg>
        {/* Score text in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-5xl font-bold"
            style={{ color: scoreColor }}
          >
            {score}
          </span>
          <span className="text-sm text-light-100 mt-1">/ 100</span>
          <span
            className="text-xs mt-2 font-semibold"
            style={{ color: scoreColor }}
          >
            {scoreLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

