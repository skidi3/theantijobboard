"use client";

import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]";

    const variants = {
      primary:
        "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 shadow-sm hover:shadow-md",
      secondary:
        "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
      outline:
        "bg-transparent text-neutral-900 border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400",
      white:
        "bg-white text-neutral-900 hover:bg-neutral-100 shadow-sm hover:shadow-md",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-5 py-2.5 text-sm rounded-lg",
      lg: "px-7 py-3.5 text-base rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
