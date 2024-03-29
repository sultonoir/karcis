import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  image: string;
}

const HomeBanner = ({ image }: Props) => {
  return (
    <Link href="/discover" className="container">
      <div className="relative h-[100px] overflow-hidden rounded-lg py-20 lg:h-[160px]">
        <Image
          alt="banner"
          src={image}
          fill
          loading="lazy"
          className="object-cover"
        />
      </div>
    </Link>
  );
};

export default HomeBanner;
