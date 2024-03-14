import React from "react";
import { cn } from "@/lib/utils";

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      {props.children}
    </header>
  );
};

export default Header;
