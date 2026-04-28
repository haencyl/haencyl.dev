"use client";

import { type ReactNode } from "react";

interface ViewTransitionProps {
  children: ReactNode;
  name?: string;
}

export function ViewTransition({ children, name }: ViewTransitionProps) {
  if (typeof window === "undefined" || !document.startViewTransition) {
    return <>{children}</>;
  }

  return (
    <span
      style={{
        viewTransitionName: name || "",
      }}
    >
      {children}
    </span>
  );
}
