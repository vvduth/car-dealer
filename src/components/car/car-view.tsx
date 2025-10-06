import { Prisma } from "@prisma/client";
import React from "react";
import CarCarousel from "./car-carousel";
import Image from "next/image";
import { formatBodyType, formatColour, formatFuelType, formatNumber, formatOdometerUnit, formatPrice, formatTransmission } from "@/lib/utils";
import parse from "html-react-parser";
import { Button } from "../ui/button";
import Link from "next/link";
import { routes } from "@/config/routes";
import { MultiStepFormEnum } from "@/config/types";
import { CheckIcon, XIcon } from "lucide-react";
import {
	CarFrontIcon,
	CarIcon,
	
	Fingerprint,
	FuelIcon,
	GaugeIcon,
	PowerIcon,
	UsersIcon,
	
} from "lucide-react";
type CarWithImagesAndMake = Prisma.ClassifiedGetPayload<{
  include: { make: true; images: true };
}>;

const features = (props: CarWithImagesAndMake) => [
	{
		id: 1,
		icon:
			props.ulezCompliance === "EXEMPT" ? (
				<CheckIcon className="w-6 h-6 mx-auto text-green-500" />
			) : (
				<XIcon className="w-6 h-6 mx-auto text-red-500" />
			),
		label: (props.ulezCompliance),
	},
	{
		id: 2,
		icon: <Fingerprint className="w-6 h-6 mx-auto text-gray-500" />,
		label: props.vrm,
	},
	{
		id: 3,
		icon: <CarIcon className="w-6 h-6 mx-auto text-gray-500" />,
		label: formatBodyType(props.bodyType),
	},
	{
		id: 4,
		icon: <FuelIcon className="w-6 h-6 mx-auto text-gray-500" />,
		label: formatFuelType(props.fuelType),
	},
	{
		id: 5,
		icon: <PowerIcon className="w-6 h-6 mx-auto text-gray-500" />,
		label: formatTransmission(props.transmission),
	},
	{
		id: 6,
		icon: <GaugeIcon className="w-6 h-6 mx-auto text-gray-500" />,
		label: `${formatNumber(props.odoReading)} ${formatOdometerUnit(props.odoUnit)}`,
	},
	{
		id: 7,
		icon: <UsersIcon className="w-6 h-6 mx-auto text-gray-500" />,
		label: props.seats,
	},
	{
		id: 8,
		icon: <CarFrontIcon className="w-6 h-6 mx-auto text-gray-500" />,
		label: props.doors,
	},
];

const CarView = (props: CarWithImagesAndMake) => {
  return (
    <div className="flex flex-col container mx-auto px-4 md:px-0 py-12">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          {/* carousel goes here */}
          <CarCarousel images={props.images} />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <Image
              src={props.make.image}
              alt={props.make.name}
              className="w-20 mr-4"
              width={120}
              height={120}
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {props.title}
              </h1>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2 mb-2">
            <span className="bg-gray-200 text-gray-800 
            text-sm font-medium px-2.5 py-2.5 rounded-md">
              {props.year}
            </span>
            <span className="bg-gray-200 text-gray-800 
            text-sm font-medium px-2.5 py-2.5 rounded-md">
              {formatNumber(props.odoReading)} {' '}
              {formatOdometerUnit(props.odoUnit)}
            </span>
            <span className="bg-gray-200 text-gray-800 
            text-sm font-medium px-2.5 py-2.5 rounded-md">
              {formatColour(props.colour)}
            </span>
            <span className="bg-gray-200 text-gray-800 
            text-sm font-medium px-2.5 py-2.5 rounded-md">
              {formatFuelType(props.fuelType)}
            </span>
          </div>
          <div className="mb-4">
            {props.description && (
            <div className="prose dark:prose-invert max-w-none">
              {parse(props.description || "")}
            </div>
            )}
            <div className="text-4xl font-bold my-4 w-full border border-slate-200
            flex justify-center items-center rounded-xl py-12">
              Our Price: { ' '}
              {formatPrice({
                price: props.price,
                currency: props.currency,
              })}
            </div>
            <Button 
             className="uppercase font-bold py-3 px-6 rounded
             w-full mb-4"
            asChild>
              <Link href={routes.reserve(props.slug , MultiStepFormEnum.WELCOME)}>
                Reserve Now
              </Link>
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {features(props).map(({ id, icon, label }) => (
                <div key={id} className="bg-muted rounded-lg shadow-xs p-4 text-center flex items-center flex-col">
								{icon}
								<p className="text-sm font-medium mt-2">{label}</p>
							</div>
						))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarView;
