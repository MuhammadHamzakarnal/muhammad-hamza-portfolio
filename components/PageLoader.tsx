"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={"fx-loader" + (done ? " done" : "")}>
      <div className="fx-loader-inner">
        <div className="fx-loader-mark">
          <span className="fx-loader-dot"></span>
          <span className="fx-loader-name">
            Hamza<span style={{ color: "var(--teal)" }}>.</span>dev
          </span>
        </div>
        <div className="fx-loader-bar">
          <div className="fx-loader-fill"></div>
        </div>
      </div>
    </div>
  );
}
