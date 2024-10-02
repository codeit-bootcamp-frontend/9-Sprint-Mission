// src/components/UI/Feature.tsx
import React from "react";
import Image from "next/image";

interface FeatureProps {
  image: string;
  alt: string;
  featureName: string;
  title: string;
  description: string;
  direction?: "row" | "row-reverse";
}

const Feature = ({
  image,
  alt,
  featureName,
  title,
  description,
  direction = "row",
}: FeatureProps) => {
  return (
    <div
      className={`mb-16 flex flex-col ${
        direction === "row-reverse" ? "lg:flex-row-reverse" : "lg:flex-row"
      } lg:items-center lg:gap-[5%] lg:mb-[138px]`}
    >
      <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
        <Image
          src={image}
          alt={alt}
          width={576}
          height={434}
          className="w-full"
        />
      </div>
      <div className="flex-1">
        <div className="text-blue-500 text-base leading-[1.4] font-bold mb-2 md:text-lg md:leading-[1.4] md:mb-3">
          {featureName}
        </div>
        <div className="font-bold text-2xl leading-[1.4] md:text-4xl md:leading-[1.4] lg:text-[40px] lg:leading-[1.4]">
          {title}
        </div>
        <p className="font-medium text-base leading-[1.2] tracking-[0.08em] mt-5 md:text-lg md:leading-[1.2] lg:text-2xl lg:leading-[1.2] lg:mt-6">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Feature;
