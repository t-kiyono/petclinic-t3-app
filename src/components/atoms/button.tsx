import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
export function Button({ children, className, ...rect }: ButtonProps) {
  return (
    <button
      className={`
        inline-block
        mb-0
        font-normal
        font-sm
        text-center
        align-middle
        touch-manipulation
        border-solid
        border-2
        whitespace-nowrap
        py-1.5
        px-3
        leading-normal
        select-none
        text-white
        bg-gray-dark
        border-green
        ${className || ""}
      `}
      {...rect}
    >
      {children}
    </button>
  );
}
