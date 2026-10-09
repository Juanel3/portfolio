"use client";

import { useLayoutEffect } from "react";

export function ProjectPageScroll() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
}
