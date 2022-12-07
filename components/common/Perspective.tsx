import classNames from "classnames";
import { HTMLProps, useCallback, useRef, useState } from "react";
import _ from "lodash";

interface PerspectiveProps extends HTMLProps<HTMLDivElement> {
  reduceEffect?: number;
}

export const Perspective = ({
  children,
  reduceEffect = 50,
  ...props
}: PerspectiveProps) => {
  const perspectiveRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      _.throttle((e: React.MouseEvent<HTMLDivElement>) => {
        const boundingBox = perspectiveRef?.current?.getBoundingClientRect();
        setMousePosition([
          (e.clientX -
            (boundingBox
              ? boundingBox.left + boundingBox.width / 2
              : window.innerWidth / 2)) /
            reduceEffect,
          (e.clientY -
            (boundingBox
              ? boundingBox.top + boundingBox.height / 2
              : window.innerHeight / 2)) /
            reduceEffect,
        ]);
      }, 16)(e);
    },
    [reduceEffect]
  );

  return (
    <div
      {...props}
      className={classNames(
        "relative flex justify-center items-center",
        props.className
      )}
      ref={perspectiveRef}
      style={{ perspective: "1000px", transition: "all 0.75s ease-out" }}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <div
        className={classNames(
          "relative flex justify-center items-center",
          props.className
        )}
        style={{
          transform: `rotateY(${mousePosition[0]}deg) rotateX(${mousePosition[1]}deg)`,
          transition: "all 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
};
