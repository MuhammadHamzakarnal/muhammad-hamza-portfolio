"use client";

import { ReactNode, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  type?: "submit";
  arrow?: string;
  size?: "md" | "sm" | "xs";
  variant?: "primary" | "ghost";
  target?: string;
};

export default function MagicButton({
  children, href, onClick, type, arrow = "→", size = "md", variant = "primary", target,
}: Props) {
  const cls = `btn-magic btn-magic-${size}${variant === "ghost" ? " btn-magic-ghost" : ""}`;
  const inner = (
    <>
      <span className="magic-dot"></span>
      <span className="magic-text">{children}</span>
      <span className="magic-text-hover">
        <span>{children}</span>
        <span className="magic-arrow">{arrow}</span>
      </span>
    </>
  );
  if (type === "submit") {
    return <button type="submit" onClick={onClick as any} className={cls}>{inner}</button>;
  }
  return <a href={href} onClick={onClick as any} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={cls}>{inner}</a>;
}
