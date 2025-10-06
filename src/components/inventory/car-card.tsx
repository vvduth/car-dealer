'use client';
import { routes } from "@/config/routes";
import { CarWithImages, MultiStepFormEnum } from "@/config/types";
import { formatColour, formatFuelType, formatNumber, formatOdometerUnit, formatPrice, formatTransmission } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import FavButton from "./fav-button";

const getKeyCarInfo = (car: CarWithImages) => {
  return [
    {
      id: "odoReading",
      icon: <GaugeCircle className="w-4 h-4" />,
      value: `${formatNumber(car.odoReading)} ${formatOdometerUnit(car.odoUnit)}`,
    },
    {
      id: "transmission",
      icon: <Cog className="w-4 h-4" />,
      value: car?.transmission ? formatTransmission(car?.transmission) : null,
    },
    {
      id: "fuelType",
      icon: <Fuel className="w-4 h-4" />,
      value: car?.fuelType ? formatFuelType(car.fuelType) : null,
    },
    {
      id: "colour",
      icon: <Paintbrush2 className="w-4 h-4" />,
      value: car?.colour ? formatColour(car.colour) : null,
    },
  ];
};

interface CarCardProps {
  car: CarWithImages;
  favourites: number[];
}

const CarCard = ({ car, favourites }: CarCardProps) => {
  const [isFav, setIsFav] = useState(favourites.includes(car.id));
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (!isFav && pathname === routes.favourites) {
      setIsVisible(false);
    }
  }, [isFav, pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          key={car.id}
          id={car.slug || "slug"}
          className="bg-card relative rounded-md shadow-lg overflow-hidden flex flex-col border transition-shadow duration-300 hover:shadow-2xl"
        >
          <div className="aspect-3/2 relative">
            <Link href={routes.singleClassified(car.slug || "slug")}>
              <Image
                placeholder="blur"
                blurDataURL={car.images[0]?.blurhash || ""}
                src={car.images[0]?.src || "/placeholder.png"}
                alt={car.images[0]?.alt || "Car Image"}
                fill={true}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                quality={25}
              />
            </Link>
            <FavButton setIsFav={setIsFav} isFav={isFav} id={car.id} />
            <div className="absolute top-2.5 right-3.5 bg-primary/90 text-primary-foreground font-bold px-2 py-1 rounded">
              <div className="text-xs lg:text-base xl:text-lg font-semibold">
                {formatPrice({ price: car.price, currency: "EUR" })}
              </div>
            </div>
          </div>
          
          <div className="p-4 flex flex-col flex-grow"> 
            {/* Top Section */}
            <div>
              <Link
                href={routes.singleClassified(car.slug || "slug")}
                className="text-sm md:text-base lg:text-lg font-semibold line-clamp-1 transition-colors hover:text-primary"
              >
                {car.title}
              </Link>
              {car.description && (
                <div className="mt-2 text-xs md:text-sm xl:text-base text-muted-foreground line-clamp-2 prose dark:prose-invert max-w-none">
                  {parse(car.description)}
                </div>
              )}
            </div>

            {/* Bottom Section - Pushed to the bottom */}
            <div className="mt-auto pt-3">
              <ul className="text-xs md:text-sm text-muted-foreground xl:flex grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-4 items-center justify-between w-full">
                {getKeyCarInfo(car).map((info) => (
                  <li key={info.id} className="font-semibold flex xl:flex-col items-center gap-x-1.5">
                    {info.icon} {info.value ? info.value : "N/A"}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:gap-x-2 w-full">
                <Button
                  className="flex-1 transition-colors hover:border-white hover:bg-primary hover:text-white py-2 lg:py-2.5 h-full text-xs md:text-sm xl:text-base"
                  asChild
                  variant={"outline"}
                >
                  <Link href={routes.reserve(car.slug || "slug", MultiStepFormEnum.WELCOME)}>
                    Reserve
                  </Link>
                </Button>
                <Button className="flex-1 py-2 lg:py-2.5 h-full text-xs md:text-sm xl:text-base" asChild size={"sm"}>
                  <Link href={routes.singleClassified(car.slug)}>View details</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CarCard;