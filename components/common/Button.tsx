import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";
import classNames from "classnames";
import Link from "next/link";

const COLORMAP = {
  orange: "bg-[#E08857] hover:bg-[#E9915F]",
  twitter: "bg-[#1DA1F3] hover:bg-[#42b0f4]",
};
interface ButtonProps
  extends PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  > {
  buttonType: "primary" | "secondary" | "tertiary";
  overrideBg?: "orange" | "twitter";
  href?: string;
}

export const Button = ({
  buttonType,
  children,
  href,
  overrideBg,
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
          "rounded-lg text-white text-base font-medium py-2 px-4",
          {
            "!text-primaryBlack border-[1px] border-secondaryGrey hover:border-primaryGrey":
              buttonType === "secondary",
          },
          `${
            overrideBg
              ? COLORMAP[overrideBg]
              : buttonType === "primary"
              ? "bg-primary hover:bg-primaryHover"
              : "bg-white hover:bg-white"
          }`,
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
        "rounded-lg text-white text-base font-medium py-2 px-4",
        {
          "!text-primaryBlack border-[1px] border-secondaryGrey hover:border-primaryGrey":
            buttonType === "secondary",
        },
        `${
          overrideBg
            ? COLORMAP[overrideBg]
            : buttonType === "primary"
            ? "bg-primary hover:bg-primaryHover"
            : "bg-white hover:bg-white"
        }`,
        props.className
      )}
    >
      {children}
    </button>
  );
};
