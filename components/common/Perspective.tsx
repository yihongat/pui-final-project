import classNames from "classnames";
import { HTMLProps, useCallback, useState } from "react";
import _ from "lodash";

export const Perspective = ({
  children,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    _.throttle((e: React.MouseEvent<HTMLDivElement>) => {
      setMousePosition([
        (window.innerWidth / 2 - e.clientX) / 50,
        (window.innerHeight / 2 - e.clientY) / 50,
      ]);
    }, 16)(e);
  }, []);

  return (
    <div
      {...props}
      className={classNames(
        "relative flex justify-center items-center",
        props.className
      )}
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
