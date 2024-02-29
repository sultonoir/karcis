// Button.tsx
"use client";
import React from "react";
import { buttonVariants, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { TbLoader3 } from "react-icons/tb";

interface RippleProps extends ButtonProps {
  href?: string;
  isLoading?: boolean;
}

const RippleButton: React.FC<RippleProps> = ({
  className,
  variant,
  size,
  isLoading = false,
  ...props
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
    if (props.onClick) {
      props.onClick(event);
    } // Panggil fungsi onClick setelah menambahkan efek ripple
  };
  return (
    <button
      id="bt"
      disabled={isLoading}
      onClick={rippleEffect}
      className={cn(
        buttonVariants({ variant, size, className }),
        "relative overflow-hidden transition-all",
      )}
    >
      {isLoading ? (
        <TbLoader3 className="h-4 w-4 animate-spin" />
      ) : (
        props.children
      )}
    </button>
  );
};

export default RippleButton;
