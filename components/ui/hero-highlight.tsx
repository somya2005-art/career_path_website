"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  // We no longer need mouseX or mouseY
  // let mouseX = useMotionValue(0);
  // let mouseY = useMotionValue(0);

  // We no longer need dotPatterns
  // const dotPatterns = { ... };

  // We no longer need handleMouseMove
  // function handleMouseMove({ ... }) { ... }

  return (
    <div
      className={cn(
        // This is the clean wrapper
        "group relative flex w-full items-center justify-center bg-transparent",
        containerClassName
      )}
      // We no longer need onMouseMove
      // onMouseMove={handleMouseMove}
    >
      {/* --- ALL DOT PATTERN DIVS REMOVED --- */}

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 dark:from-blue-900/40 dark:to-purple-900/40`,
        className
      )}
    >
      <span className="relative z-10 text-fuchsia-200">{children}</span>
    </motion.span>
  );
};
