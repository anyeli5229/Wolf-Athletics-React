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
    border-slate-400
    focus-within:border-sky-500
    focus-within:ring-2
    focus-within:ring-sky-500/20
  `,
    error: `
    border-red-500/80
    focus-within:border-red-500
    focus-within:ring-2
    focus-within:ring-red-500/20
  `,
    disabled: `
    bg-slate-900/40
    border-slate-800/50
    opacity-50
    cursor-not-allowed
  `,
};

const baseContainer = `
    flex
    items-center
    gap-2.5
    px-3.5
    py-2.5
    bg-white
    border
    rounded-xl
    transition-all
    duration-200
`;

export default function Input({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    startIcon, 
    endIcon, 
    className = "", 
    disabled, 
    id, 
    ...props
}: InputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const stateClass = disabled ? states.disabled : error ? states.error : states.normal;

    return (
        <div className={fullWidth ? "w-full" : ""}>

            <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
                {label}
            </label>

            <div className={`${baseContainer} ${stateClass} ${className}`}>
                {startIcon && (
                    <div className="text-slate-500 transition-colors group-focus-within:text-sky-400">
                        {startIcon}
                    </div>
                )}

                <input
                    id={inputId}
                    disabled={disabled}
                    className="flex-1 bg-white border-none outline-none text-slate-600 text-sm placeholder:text-slate-500 disabled:cursor-not-allowed"
                    {...props}
                />

                {endIcon && (
                    <div className="text-slate-500">
                        {endIcon}
                    </div>
                )}
            </div>

            {error ? (
                <p className="mt-1.5 text-xs font-medium text-red-400">
                    {error}
                </p>
            ) : helperText ? (
                <p className="mt-1.5 text-xs text-slate-400">
                    {helperText}
                </p>
            ) : null}
        </div>
    );
}