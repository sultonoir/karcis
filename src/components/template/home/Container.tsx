import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title?: string;
  link?: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ title, link, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn("flex h-fit flex-col gap-2", props.className)}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          {link}
        </div>
        {props.children}
      </div>
    );
  },
);

Container.displayName = "Container";

export default Container;
