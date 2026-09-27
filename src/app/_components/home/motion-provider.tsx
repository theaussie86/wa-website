"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Respektiert prefers-reduced-motion für alle Animationen darunter.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
