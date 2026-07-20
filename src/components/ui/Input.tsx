import { useId, type InputHTMLAttributes, type ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
};

const states = {
    normal: `
    border-gray-300
    focus-within:border-sky-500
    focus-within:ring-2
    focus-within:ring-sky-200
  `,
    error: `
    border-red-500
    focus-within:border-red-500
    focus-within:ring-2
    focus-within:ring-red-200
  `,
    disabled: `
    bg-gray-100
    border-gray-200
    opacity-70
    cursor-not-allowed
  `,
};

const baseContainer = `
    flex
    items-center
    gap-2
    px-3
    py-2
    border
    rounded-lg
    transition-all
    duration-200
`;

export default function Input({ label, error, helperText, fullWidth = false, startIcon, endIcon, className = "", disabled, id, ...props
}: InputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const stateClass = disabled ? states.disabled : error ? states.error : states.normal;

    return (
        <div className={fullWidth ? "w-full" : ""}>

            <label htmlFor={inputId} className="mb-2 block font-medium text-gray-700">
                {label}
            </label>

            <div className={`${baseContainer} ${stateClass} ${className}`}
            >
                {startIcon && (
                    <div className="text-gray-400">
                        {startIcon}
                    </div>
                )}

                <input
                    id={inputId}
                    disabled={disabled}
                    className=" flex-1 bg-transparent border-none outline-none placeholder:text-gray-400"
                    {...props}
                />

                {endIcon && (
                    <div className="text-gray-400">
                        {endIcon}
                    </div>
                )}
            </div>

            {error ? (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            ) : helperText ? (
                <p className="mt-1 text-sm text-gray-500">
                    {helperText}
                </p>
            ) : null}
        </div>
    );
}