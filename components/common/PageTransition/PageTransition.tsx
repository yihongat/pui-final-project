import classNames from "classnames";
import { HTMLProps, useCallback, useState } from "react";
import _ from "lodash";
import { motion } from "framer-motion";

interface TransitionProps extends HTMLProps<HTMLDivElement> {
  duration?: number;
  delay?: number;
  stagger?: number;
}

export const PageTransition = ({
  children,
  duration = 0.7,
  delay = 0,
  stagger = 0.05,
  ...props
}: TransitionProps) => {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 50 },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: delay,
        duration: duration,
        staggerChildren: stagger,
        ease: [0.47, 0, 0.13, 1],
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      y: -100,
      transition: {
        duration: 0.4,
        ease: [0.47, 0, 0.13, 1],
      },
    },
  };

  return (
    <motion.main
      className={props.className}
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit"
      transition={{ type: "ease" }} // Set the transition to linear
    >
      {children}
    </motion.main>
  );
};
