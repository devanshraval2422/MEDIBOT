import { ReactNode } from "react";
import { Link } from "wouter";
import { APP_NAME } from "@/lib/constants";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  onClick?: () => void;
  href?: string;
  children?: ReactNode;
}

export default function Logo({
  size = "md",
  withText = true,
  className = "",
  textClassName = "",
  iconClassName = "",
  onClick,
  href = "/",
  children,
}: LogoProps) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSize = sizes[size];
  const textSize = textSizes[size];

  const LogoContent = (
    <>
      <div className={`rounded-full gradient-bg flex items-center justify-center text-white ${iconSize} ${iconClassName}`}>
        <i className="ri-health-book-line text-xl"></i>
      </div>
      {withText && (
        <span className={`font-heading font-bold ${textSize} text-primary-500 ${textClassName}`}>
          {APP_NAME}
        </span>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        <a className={`flex items-center space-x-2 cursor-pointer ${className}`}>
          {LogoContent}
        </a>
      </Link>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`} onClick={onClick}>
      {LogoContent}
    </div>
  );
}
