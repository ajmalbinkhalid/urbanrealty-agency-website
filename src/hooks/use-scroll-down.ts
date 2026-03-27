"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export const useScrollDown = (threshold = 200) => {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrollDown(latest > threshold);
  });

  return isScrollDown;
};
