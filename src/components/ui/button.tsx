import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export function Button({ 
  size = 'md', 
  variant = 'default',
  children, 
  className, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "rounded-full font-medium transition-all duration-300",
        // Size variants
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        // Visual variants
        {
          'bg-accent-blue text-white hover:bg-accent-blue/90': variant === 'default',
          'border border-white text-white hover:bg-white hover:text-accent-blue': variant === 'outline',
          'text-white hover:bg-white/10': variant === 'ghost',
        },
        // Shadow and hover effects
        "shadow-lg hover:shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

