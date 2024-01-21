import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="bg-primary-50 bg-dotted-pattern bg-contain py-5 dark:bg-black md:py-10">
      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
        <div className="flex w-full flex-col justify-center gap-8">
          <h1 className="h1-bold text-wrap">
            Reserve, Create, Celebrate: Your Event, Your Rules!
          </h1>
          <p className="p-regular-20 md:p-regular-24">
            {`"Unlock the power of seamless reservations and unleash your creativity
          with us!"`}
          </p>
          <a
            href="/"
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-blue-600/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:w-fit"
          >
            Explore now
          </a>
        </div>
        <div className="flex w-full justify-center">
          <Image
            src="/assets/images/hero.png"
            alt="hero image"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
