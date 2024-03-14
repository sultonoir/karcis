import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface UserProps {
  avatar: string;
  name: string | React.ReactNode;
  description?: React.ReactNode | string;
  imageHeight?: string;
  imageWidth?: string;
  classNames?: {
    wraper?: string;
    avatar?: string;
    name?: string;
    description?: string;
  };
}

const User = ({
  avatar,
  name,
  description,
  classNames,
  imageHeight,
  imageWidth,
}: UserProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div
        style={{
          height: imageHeight ?? "48px",
          width: imageWidth ?? "48px",
        }}
        className="relative overflow-hidden rounded-full"
      >
        <Image
          fill
          priority
          sizes="(min-width: 1480px) 300px, (min-width: 1040px) 17.14vw, (min-width: 780px) calc(33.33vw - 37px), calc(100vw - 66px)"
          alt="user"
          className="object-cover"
          src={avatar}
        />
      </div>
      <div className={cn("flex flex-col", classNames?.wraper)}>
        <div className={cn("font-medium", classNames?.name)}>{name}</div>
        <div
          className={cn(
            "text-sm text-muted-foreground",
            classNames?.description,
          )}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default User;
