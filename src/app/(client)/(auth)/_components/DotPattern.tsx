"use client";

import { useTheme } from "next-themes";

export default function DotPattern() {
  const { theme } = useTheme();
  const dotColor = theme === "light" ? "#e5e7eb" : "#374151";

  return (
    <div
      className={`absolute inset-0 -z-10 h-full w-full bg-neutral bg-[radial-gradient(${dotColor}_1px,transparent_1px)] [background-size:16px_16px]`}
    ></div>
  );
}
