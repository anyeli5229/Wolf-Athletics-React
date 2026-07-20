import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
};

const variants = {
  primary: "text-white bg-gradient-to-r from-sky-700 to-sky-400 shadow-md shadow-sky-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-300 active:scale-95",
  secondary: "text-white bg-gradient-to-r from-gray-500 to-gray-400 shadow-md shadow-gray-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-300 active:scale-95",
  danger: "text-white bg-gradient-to-r from-red-600 to-red-400 shadow-md shadow-red-300 hover:scale-105 hover:shadow-lg hover:shadow-red-300 active:scale-95",
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