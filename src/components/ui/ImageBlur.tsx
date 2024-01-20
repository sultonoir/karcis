"use client";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
type Props = {
  image: string;
};

const ImageBlur = ({ image }: Props) => {
  return (
    <LazyLoadImage
      src={image}
      width={200}
      alt="image"
      effect="blur"
      className="h-96 w-auto"
    />
  );
};

export default ImageBlur;
