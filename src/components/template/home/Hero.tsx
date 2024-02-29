import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="py-5 md:py-10">
      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
        <div className="flex w-full flex-col justify-center gap-8">
          <h1 className="h1-bold text-wrap">
            Reserve, Create, Celebrate: Your Event, Your Rules!
          </h1>
          <p className="p-regular-20 md:p-regular-24">
            {`"Unlock the power of seamless reservations and unleash your creativity
          with us!"`}
          </p>
          <Button asChild className="w-fit">
            <Link href="/discover">Explore now</Link>
          </Button>
        </div>
        <div className="flex w-full justify-end">
          <Image
            src="/assets/images/hero.png"
            alt="hero image"
            width={400}
            height={400}
            className="h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
