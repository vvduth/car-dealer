import { CarFilterSchema } from "@/app/schemas/car.schema";
import { AwaitedPageProps } from "@/config/types";
import prettyBytes from "pretty-bytes";
import {
  BodyType,
  ClassifiedStatus,
  Colour,
  CurrencyCode,
  CustomerStatus,
  FuelType,
  OdoUnit,
  Prisma,
  Transmission,
} from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parse } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormatPriceArgs {
  price: number | null;
  currency: CurrencyCode | null;
}

export function formatPrice({ price, currency }: FormatPriceArgs) {
  if (!price) return "0";

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    ...(currency && { currency }),
    maximumFractionDigits: 0,
  });

  return formatter.format(price / 100);
}

export function formatNumber(
  num: number | null,
  options?: Intl.NumberFormatOptions
) {
  if (!num) return "0";

  return new Intl.NumberFormat("en-GB", options).format(num);
}

export function formatOdometerUnit(unit: OdoUnit) {
  return unit === OdoUnit.MILES ? "miles" : "km";
}

export function formatTransmission(transmission: Transmission) {
  return transmission === Transmission.AUTOMATIC ? "Automatic" : "Manual";
}

export function formatSimpleDate(date: Date) {
  return new Date(date).toISOString().split('T')[0];
}

export function formatFuelType(fuelType: FuelType) {
  switch (fuelType) {
    case FuelType.PETROL:
      return "Petrol";
    case FuelType.DIESEL:
      return "Diesel";
    case FuelType.ELECTRIC:
      return "Electric";
    case FuelType.HYBRID:
      return "Hybrid";
    default:
      return "Unknown";
  }
}

export function formatColour(colour: Colour) {
  switch (colour) {
    case Colour.BLACK:
      return "Black";
    case Colour.WHITE:
      return "White";
    case Colour.SILVER:
      return "Silver";
    case Colour.RED:
      return "Red";
    case Colour.BLUE:
      return "Blue";
    case Colour.BROWN:
      return "Brown";
    case Colour.GOLD:
      return "Gold";
    case Colour.GREEN:
      return "Green";
    case Colour.GREY:
      return "Grey";
    case Colour.ORANGE:
      return "Orange";
    case Colour.PINK:
      return "Pink";
    case Colour.PURPLE:
      return "Purple";
    case Colour.YELLOW:
      return "Yellow";
    default:
      return "Unknown";
  }
}

export function formatBodyType(bodyType: BodyType) {
  switch (bodyType) {
    case BodyType.CONVERTIBLE:
      return "Convertible";
    case BodyType.COUPE:
      return "Coupe";
    case BodyType.HATCHBACK:
      return "Hatchback";
    case BodyType.SUV:
      return "SUV";
    case BodyType.WAGON:
      return "Wagon";
    case BodyType.SEDAN:
      return "Sedan";
    default:
      return "Unknown";
  }
}

export const buildClassifiedFilterQuery = (
  searchParams: AwaitedPageProps["searchParams"] | undefined
): Prisma.ClassifiedWhereInput => {
  const { data } = CarFilterSchema.safeParse(searchParams);

  if (!data) return { status: ClassifiedStatus.LIVE };

  const keys = Object.keys(data);

  const taxonomyFilters = ["make", "model", "modelVariant"];

  const rangeFilters = {
    minYear: "year",
    maxYear: "year",
    minPrice: "price",
    maxPrice: "price",
    minReading: "odoReading",
    maxReading: "odoReading",
  };

  const numFilters = ["seats", "doors"];
  const enumFilters = [
    "odoUnit",
    "currency",
    "transmission",
    "bodyType",
    "fuelType",
    "colour",
    "ulezCompliance",
  ];

  const mapParamsToFields = keys.reduce(
    (acc, key) => {
      const value = searchParams?.[key] as string | undefined;
      if (!value) return acc;

      if (taxonomyFilters.includes(key)) {
        acc[key] = { id: Number(value) };
      } else if (enumFilters.includes(key)) {
        acc[key] = value.toUpperCase();
      } else if (numFilters.includes(key)) {
        acc[key] = Number(value);
      } else if (key in rangeFilters) {
        const field = rangeFilters[key as keyof typeof rangeFilters];
        acc[field] = acc[field] || {};
        if (key.startsWith("min")) {
          acc[field].gte = Number(value);
        } else if (key.startsWith("max")) {
          acc[field].lte = Number(value);
        }
      }

      return acc;
    },
    {} as { [key: string]: any }
  );

  return {
    status: ClassifiedStatus.LIVE,
    ...(searchParams?.q && {
      OR: [
        {
          title: {
            contains: searchParams.q as string,
            mode: "insensitive",
          },
        },

        {
          description: {
            contains: searchParams.q as string,
            mode: "insensitive",
          },
        },
      ],
    }),
    ...mapParamsToFields,
  };
};

export const generataTimeOptions = () => {
  const times = [];
  const startHour = 8;
  const endHours = 20;
  for (let hour = startHour; hour <= endHours; hour++) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(hour);
    date.setMinutes(0);
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    times.push({
      value: formattedTime,
      label: formattedTime,
    });
  }
  return times;
};

export const generateDateOptions = () => {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      label: format(date, "dd MMMM yyyy"),
      value: format(date, "yyyy-MM-dd"),
    });
  }
  return dates;
};

export const formatDate = (date: string, time: string) => {
	// Parse date with correct format: '2025-06-14' -> 'yyyy-MM-dd'
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    
    // Parse time with correct format: '12:00' -> 'HH:mm' (24-hour format)
    const parsedTime = parse(time, "HH:mm", new Date());

    // Combine date and time
    parsedDate.setHours(parsedTime.getHours(), parsedTime.getMinutes(), 0, 0);

    return parsedDate;
};


export function calculatePercentageChange(current: number, previous: number) {
	if (previous === 0) return current > 0 ? 100 : current < 0 ? -100 : 0;

	return ((current - previous) / Math.abs(previous)) * 100;
}

export function generateYears(minYear: number, maxYear?: number): string[] {
	const currentYear = maxYear ? maxYear : new Date().getFullYear();
	const years: string[] = [];

	for (let year = currentYear; year >= minYear; year--) {
		years.push(`${year}`);
	}

	return years;
}


export function formatCarStatus (status: ClassifiedStatus) {
  switch (status) {
    case ClassifiedStatus.LIVE:
      return "Live";
    
    case ClassifiedStatus.SOLD:
      return "Sold";
    case ClassifiedStatus.DRAFT:
      return "Draft";
    default:
      return "Unknown";
  }
}

export const convertToMb = (bytes: number) => {
	return prettyBytes(bytes, {
		bits: false,
		maximumFractionDigits: 1,
		space: false,
	});
};

export function formatCustomerStatus(status: CustomerStatus) {
	switch (status) {
		case CustomerStatus.COLD:
			return "Cold";
		case CustomerStatus.CONTACTED:
			return "Contacted";
		case CustomerStatus.INTERESTED:
			return "Interested";
		case CustomerStatus.PURCHASED:
			return "Purchased";
		case CustomerStatus.SUBSCRIBER:
			return "Subscriber";
	}
}