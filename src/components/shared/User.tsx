import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface UserProps {
  avatar: string;
  name: string | React.ReactNode;
  description?: React.ReactNode | string;
  imageHeight?: string;
  imageWidth?: string;
  classNames?: {
    wraper: string;
    avatar: string;
    name: string;
    description: string;
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="user"
          className="object-cover"
          src={avatar}
        />
      </div>
      <div className={clsx("flex flex-col", classNames?.wraper)}>
        <div className={clsx("font-medium", classNames?.name)}>{name}</div>
        <div
          className={clsx(
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
