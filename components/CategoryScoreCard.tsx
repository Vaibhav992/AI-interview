"use client";

import { cn } from "@/lib/utils";

interface CategoryScoreCardProps {
  name: string;
  score: number;
  comment: string;
  className?: string;
}

export default function CategoryScoreCard({
  name,
  score,
  comment,
  className,
}: CategoryScoreCardProps) {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score < 60) return "#f75353"; // destructive-100 (red)
    if (score < 80) return "#fbbf24"; // yellow/amber
    return "#49de50"; // success-100 (green)
  };

  const scoreColor = getScoreColor(score);
  const percentage = Math.min(100, Math.max(0, score));

  return (
    <div
      className={cn(
        "dark-gradient rounded-xl p-6 border border-dark-300/50 flex flex-col gap-4",
        className
      )}
    >
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-xl font-semibold text-white">{name}</h4>
        <div className="flex items-center gap-2">
          <span
            className="text-2xl font-bold"
            style={{ color: scoreColor }}
          >
            {score}
          </span>
          <span className="text-light-100">/100</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-dark-300 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: scoreColor,
            boxShadow: `0 0 10px ${scoreColor}60`,
          }}
        />
      </div>

      {/* Comment */}
      <p className="text-light-100 text-sm leading-relaxed">{comment}</p>
    </div>
  );
}

