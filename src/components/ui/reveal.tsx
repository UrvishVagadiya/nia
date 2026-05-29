"use client";

import React from "react";
import { motion, HTMLMotionProps, type Easing } from "framer-motion";

export const EASE_PRESET: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
}

/**
 * A highly reusable wrapper that animates element entrances smoothly when scrolled into view.
 */
export const ScrollReveal = ({
  children,
  direction = "up",
  distance = 30,
  duration = 0.8,
  delay = 0,
  amount = 0.2,
  once = true,
  ...props
}: ScrollRevealProps) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: EASE_PRESET satisfies Easing,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  staggerDelay?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
}

/**
 * A parent container that orchestrates a cascading/staggered reveal animation sequence for its children.
 */
export const StaggerContainer = ({
  children,
  staggerDelay = 0.08,
  delay = 0,
  amount = 0.15,
  once = true,
  ...props
}: StaggerContainerProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
}

/**
 * An individual item designed to reside inside a StaggerContainer to receive stagger-delayed transitions.
 */
export const StaggerItem = ({
  children,
  direction = "up",
  distance = 25,
  duration = 0.7,
  ...props
}: StaggerItemProps) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          ...directions[direction],
        },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            ease: EASE_PRESET satisfies Easing,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
