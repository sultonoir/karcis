import Image from "next/image";
import React from "react";

interface Props {
  descriptions?: string;
}

const EmptyPage = ({
  descriptions = "We can&apos;t find the event with these search keywords, please pay attention to the spelling or search again.",
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Image
        alt="no-result"
        src="/no-result.svg"
        width={200}
        height={100}
        priority
        loading="eager"
      />
      <h2 className="text-lg font-extrabold leading-none">Event not found</h2>
      <p className="max-w-md text-center">{descriptions}</p>
    </div>
  );
};

export default EmptyPage;
