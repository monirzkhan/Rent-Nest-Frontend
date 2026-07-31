"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const propertyImages = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc",
  "https://images.unsplash.com/photo-1600566753151-384129cf4e3e",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
];

export default function PropertyGallery() {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;

    const index = mainApi.selectedScrollSnap();

    setSelectedIndex(index);
    thumbApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;

    onSelect();

    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);

    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  // Auto Scroll
  useEffect(() => {
    if (!mainApi) return;

    const interval = setInterval(() => {
      mainApi.scrollNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [mainApi]);

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Main Carousel */}
      <Carousel
        setApi={setMainApi}
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {propertyImages.map((image, index) => (
            <CarouselItem key={index}>
              <CarouselItem key={index}>
                <motion.div
                  style={{
                    perspective: 1200,
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    rotateX: 5,
                    rotateY: -8,
                    scale: 1.03,
                  }}
                  initial={{
                    opacity: 0,
                    rotateY: 25,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    rotateY: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl">
                    <Image
                      src={`${image}?auto=format&fit=crop&w=1400&q=80`}
                      alt={`Property ${index + 1}`}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </CarouselItem>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnail Carousel */}
      <Carousel
        setApi={setThumbApi}
        opts={{
          containScroll: "keepSnaps",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {propertyImages.map((image, index) => (
            <CarouselItem
              key={index}
              className="basis-1/5 cursor-pointer pl-2 sm:basis-1/6"
              onClick={() => onThumbClick(index)}
            >
              <div
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300",
                  selectedIndex === index
                    ? "border-primary opacity-100 ring-2 ring-primary"
                    : "border-transparent opacity-50 hover:opacity-100"
                )}
              >
                <Image
                  src={`${image}?auto=format&fit=crop&w=300&q=75`}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}