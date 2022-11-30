import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";
import classNames from "classnames";
import Link from "next/link";

interface ButtonProps
  extends PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  > {
  buttonType: "primary" | "secondary";
  href?: string;
}

export const Button = ({
  buttonType,
  children,
  href,
  ...props
}: ButtonProps) => {
  return href ? (
    <Link href={href}>
      <button
        {...props}
        onClick={(e) => {
          if (props.onClick) {
            props.onClick(e);
          }
        }}
        className={classNames(
          "rounded-lg bg-primary text-white font-medium py-3 px-8 text-2xl",
          {
            "!bg-white !text-primary border-2 border-primary":
              buttonType === "secondary",
          },
          props.className
        )}
      >
        {children}
      </button>
    </Link>
  ) : (
    <button
      {...props}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
      }}
      className={classNames(
        "rounded-lg bg-primary text-white font-medium py-3 px-8 text-2xl",
        {
          "!bg-white !text-primary border-2 border-primary":
            buttonType === "secondary",
        },
        props.className
      )}
    >
      {children}
    </button>
  );
};
