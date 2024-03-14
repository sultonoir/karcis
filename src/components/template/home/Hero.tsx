import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="wrapper flex h-[calc(100dvh-152px)] flex-col items-center justify-center gap-2 lg:flex-row">
      <div className="flex w-full flex-col items-center justify-center gap-8 lg:items-start">
        <h1 className="h1-bold text-wrap text-center lg:text-left">
          Reserve, Create, Celebrate: Your Event, Your Rules!
        </h1>
        <p className="p-regular-20 md:p-regular-24 text-center lg:text-left">
          {`"Unlock the power of seamless reservations and unleash your creativity
          with us!"`}
        </p>
        <Button asChild className="h-14 w-fit text-lg">
          <Link href="/discover">
            <Compass className="mr-2" />
            Explore now
          </Link>
        </Button>
      </div>
      <div className="hidden w-full justify-end lg:flex ">
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
  );
};

export default Hero;
