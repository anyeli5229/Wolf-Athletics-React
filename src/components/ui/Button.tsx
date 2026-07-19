import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
};

const variants = {
  primary: "bg-[#2563EB] hover:bg-[#1D4ED8] text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-[#1F2937]",
  danger: "bg-[#DC2626] hover:bg-[#B91C1C] text-white",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-5 py-2.5 text-base rounded-lg",
  lg: "px-7 py-3 text-lg rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        font-medium
        transition-all
        duration-200
        ease-in-out
        active:scale-95
        disabled:opacity-60
        ${className}
      `}
      {...props}
    >
      {isLoading ? "Guardando..." : children}
    </button>
  );
}