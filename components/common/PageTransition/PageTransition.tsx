import classNames from "classnames";
import { HTMLProps, useCallback, useState } from "react";
import _ from "lodash";
import { motion, Variants } from "framer-motion";
interface TransitionProps extends HTMLProps<HTMLDivElement> {
  duration?: number;
  delay?: number;
  stagger?: number;
  customSettings?: Variants;
  mobileOnly?: boolean;
}

export const PageTransition = ({
  children,
  duration = 0.7,
  delay = 0,
  stagger = 0.05,
  customSettings,
  mobileOnly = false,
  ...props
}: TransitionProps) => {
  const variants =
    customSettings != null
      ? customSettings
      : {
          hidden: { opacity: 1, x: 0, y: 0 },
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

  const mobileVariants = {
    hidden: { opacity: 0, x: 0, y: 50 },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: 0.7,
        duration: Math.max(duration * 0.5, 0.8),
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

  return mobileOnly ? (
    <motion.main
      className={classNames(props.className)}
      variants={mobileVariants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      whileInView="enter"
      viewport={{ once: true, margin: "40%" }}
      exit="exit"
      transition={{ type: "ease" }} // Set the transition to linear
    >
      {children}
    </motion.main>
  ) : (
    <>
      <motion.main
        className={classNames("hidden lg:block", props.className)}
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit"
        transition={{ type: "ease" }} // Set the transition to linear
      >
        {children}
      </motion.main>
      <motion.main
        className={classNames("block lg:hidden", props.className)}
        variants={mobileVariants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        whileInView="enter"
        viewport={{ once: true, margin: "40%" }}
        exit="exit"
        transition={{ type: "ease" }} // Set the transition to linear
      >
        {children}
      </motion.main>
    </>
  );
};
