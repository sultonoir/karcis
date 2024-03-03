import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  blur: string;
}

const EventHero = ({ image, blur }: Props) => {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="relative mb-2 overflow-hidden rounded-md bg-muted"
    >
      <Image
        src={image}
        alt="Photo by Drew Beamer"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        fill
        priority
        placeholder="blur"
        blurDataURL={blur}
        className="rounded-md object-cover"
      />
    </AspectRatio>
  );
};

export default EventHero;
