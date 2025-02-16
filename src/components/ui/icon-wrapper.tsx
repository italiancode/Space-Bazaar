import Link from "next/link";
import { ReactNode } from "react";

const IconWrapper = ({
  children,
  href,
  onClick = () => {},
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) => {
  const Component = href ? Link : "button";
  return (
    <Component
      {...(href ? { href } : ({} as any))}
      onClick={onClick}
      className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200 
                   shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]
                   focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      {children}
    </Component>
  );
};

export default IconWrapper;
