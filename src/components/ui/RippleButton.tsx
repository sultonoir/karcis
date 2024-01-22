// Button.tsx
"use client";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";
import { TbLoader3 } from "react-icons/tb";
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  isLoading?: boolean;
  href?: string;
}

const RippleButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  variant = "default",
  size = "default",
  asChild,
  isLoading,
  href,
}) => {
  const rippleEffect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
    circle.classList.add("ripple");

    const ripple = btn.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    btn.appendChild(circle);
    if (onClick) {
      onClick();
    } // Panggil fungsi onClick setelah menambahkan efek ripple
  };

  const rippleEffectA = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
    circle.classList.add("ripple");

    const ripple = btn.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    btn.appendChild(circle);
    if (onClick) {
      onClick();
    } // Panggil fungsi onClick setelah menambahkan efek ripple
  };
  return (
    <>
      {asChild && href ? (
        <a
          href={href}
          className={cn(buttonVariants({ variant, size }), className)}
          onClick={rippleEffectA}
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          disabled={isLoading}
          className={cn(buttonVariants({ variant, size }), className)}
          onClick={rippleEffect}
        >
          {isLoading ? (
            <>
              <TbLoader3 className="mr-2 h-4 w-4 animate-spin" />
              {children}
            </>
          ) : (
            children
          )}
        </button>
      )}
    </>
  );
};

export default RippleButton;
