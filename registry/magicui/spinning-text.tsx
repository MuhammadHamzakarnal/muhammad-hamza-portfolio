"use client";

import { CSSProperties } from "react";

interface SpinningTextProps {
  children: string;
  duration?: number;
  fontSize?: number;
  radius?: number;
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function SpinningText({
  children,
  duration = 12,
  fontSize = 10,
  radius = 55,
  reverse = false,
  className = "",
  style,
}: SpinningTextProps) {
  const chars = children.split("");
  const total = chars.length;
  const anglePerChar = 360 / total;

  return (
    <div
      className={`spinning-text-root ${className}`}
      style={{
        position: "relative",
        width: radius * 2,
        height: radius * 2,
        animation: `spin ${duration}s linear infinite ${reverse ? "reverse" : "normal"}`,
        ...style,
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: `${fontSize}px`,
            lineHeight: 1,
            transformOrigin: "0 0",
            transform: `rotate(${anglePerChar * i}deg) translateY(-${radius}px)`,
            color: "var(--text-2)",
            fontFamily: "var(--mono)",
            letterSpacing: "0.05em",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
