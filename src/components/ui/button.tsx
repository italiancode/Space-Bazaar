import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "outline" | "default" | "ghost" | "destructive" | undefined;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  size = 'md', 
  variant = 'default', 
  fullWidth = false,
  children, 
  className, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full font-medium transition-all duration-300 cursor-pointer inline-flex items-center justify-center",
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
          'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white': variant === 'outline',
          'text-blue-600 hover:bg-blue-100': variant === 'ghost',
          'bg-red-600 text-white hover:bg-red-700': variant === 'destructive',
        },
        {
          'w-full': fullWidth,
          'w-auto': !fullWidth,
        },
        "shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

