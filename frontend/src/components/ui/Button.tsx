import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "danger-ghost" |"outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
};

const variants = {
  primary: "text-white bg-gradient-to-r from-sky-700 to-sky-400 shadow-md shadow-sky-300/30 hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-300/40 active:scale-95",
  secondary: "text-white bg-gradient-to-r from-gray-600 to-gray-500 shadow-md shadow-gray-300/30 hover:scale-[1.02] hover:shadow-lg active:scale-95",
  danger: "text-white bg-gradient-to-r from-red-600 to-red-400 shadow-md shadow-red-300/30 hover:scale-[1.02] hover:shadow-lg active:scale-95",
  
  ghost: "text-slate-400 hover:text-white hover:bg-slate-400/60 focus:bg-slate-800/80 focus:text-slate-100 active:scale-95",
  "danger-ghost": "text-red-400/80 hover:text-red-400 hover:bg-red-500/10 focus:bg-red-500 focus:text-white active:scale-95", 
  outline: "text-sky-400 border border-sky-400/40 hover:bg-sky-400/10 hover:border-sky-400 active:scale-95",
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
        inline-flex items-center justify-center
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        font-medium
        transition-all
        duration-200
        ease-in-out
        disabled:opacity-50 disabled:pointer-events-none disabled:scale-100
        ${className}
      `}
      {...props}
    >
      {isLoading ? "Guardando..." : children}
    </button>
  );
}