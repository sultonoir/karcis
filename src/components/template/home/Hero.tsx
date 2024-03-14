import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="wrapper flex h-[80dvh] flex-col items-center justify-center gap-2 lg:flex-row">
      <div className="flex w-full flex-col justify-center gap-8">
        <h1 className="h1-bold text-wrap">
          Reserve, Create, Celebrate: Your Event, Your Rules!
        </h1>
        <p className="p-regular-20 md:p-regular-24">
          {`"Unlock the power of seamless reservations and unleash your creativity
          with us!"`}
        </p>
        <Button asChild className="w-fit">
          <Link href="/discover">
            <Compass className="mr-2" />
            Explore now
          </Link>
        </Button>
      </div>
      <div className="flex w-full justify-end">
        <Image
          src="/assets/images/hero.png"
          alt="hero image"
          width={400}
          height={400}
          className="h-[500px]"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
