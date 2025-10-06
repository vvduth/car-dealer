"use client";
import React, { useEffect, useState } from "react";

import { SidebarProps } from "./sidebar";
import { useRouter } from "next/navigation";
import { useQueryStates, parseAsString } from "nuqs";
import { routes } from "@/config/routes";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import { Select } from "../ui/select";
import {
  BodyType,
  Colour,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Prisma,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";
import { RangeFilter } from "./RangeFilters";
import TaxonomyFilters from "./TaxonomyFilters";
import SearchInput from "../shared/search-input";
import {
  cn,
  formatBodyType,
  formatColour,
  formatFuelType,
  formatOdometerUnit,
  formatTransmission,
} from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
interface DialogFiltersProps extends SidebarProps {
  count: number;
}

const DialogFilters = ({
  minMaxValue,
  searchParams,
  count,
}: DialogFiltersProps) => {
  const [open, setOpen] = useState(false);
  const [filtersCount, setFiltersCount] = useState(0);
  const { _min, _max } = minMaxValue;
  const router = useRouter();
  const [queryStates, setQueryStates] = useQueryStates(
    {
      make: parseAsString.withDefault(""),
      model: parseAsString.withDefault(""),
      modelVariant: parseAsString.withDefault(""),
      minYear: parseAsString.withDefault(""),
      maxYear: parseAsString.withDefault(""),
      minPrice: parseAsString.withDefault(""),
      maxPrice: parseAsString.withDefault(""),
      minReading: parseAsString.withDefault(""),
      maxReading: parseAsString.withDefault(""),
      currency: parseAsString.withDefault(""),
      odoUnit: parseAsString.withDefault(""),
      transmission: parseAsString.withDefault(""),
      fuelType: parseAsString.withDefault(""),
      bodyType: parseAsString.withDefault(""),
      colour: parseAsString.withDefault(""),
      doors: parseAsString.withDefault(""),
      seats: parseAsString.withDefault(""),
      ulezCompliance: parseAsString.withDefault(""),
    },
    {
      shallow: false,
    }
  );

  useEffect(() => {
    const filtersCount = Object.entries(
      searchParams as Record<string, string>
    ).filter(([key, value]) => key !== "page" && value).length;
    setFiltersCount(filtersCount);
  }, [searchParams]);

  const clearAllFilter = () => {
    const url = new URL(routes.inventory, process.env.NEXT_PUBLIC_APP_URL);
    router.replace(url.toString());
    setFiltersCount(0);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setQueryStates({
      [name]: value || null,
    });

    if (name === "make") {
      setQueryStates({
        model: null,
        modelVariant: null,
      });
    }

    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(name, value);
    } else {
      newSearchParams.delete(name);
    }
    router.push(`${routes.inventory}?${newSearchParams.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="lg:hidden">
          <Settings2 className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] h-[90vh] overflow-y-auto rounded-xl">
        <div className="space-y-6">
            <div>
          <div className="text-lg font-semibold flex justify-between px-4">
            <DialogTitle>Filters</DialogTitle>
            
          </div>
          <div className="mt-2" />
        </div>
        <div className="p-4">
          <SearchInput
            placeholder="Search for car..."
            className="w-full px-3 py-2 border rounded-md
                focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="space-y-2">
          <TaxonomyFilters
            searchParams={searchParams}
            handleChange={handleChange}
          />
          <RangeFilter
            label="Year"
            minName="minYear"
            maxName="maxYear"
            defaultMin={_min.year || 1925}
            defaultMax={_max.year || new Date().getFullYear()}
            handleChange={handleChange}
            searchParams={searchParams}
          />
          <RangeFilter
            label="Price"
            minName="minPrice"
            maxName="maxPrice"
            defaultMin={_min.price || 0}
            defaultMax={_max.price || Number.MAX_SAFE_INTEGER}
            handleChange={handleChange}
            increment={1000000}
            thousandSeparator={true}
            currency={{ currencyCode: "EUR" }}
            searchParams={searchParams}
          />
          <RangeFilter
            label="Odometer Reading"
            minName="minReading"
            increment={5000}
            thousandSeparator={true}
            maxName="maxReading"
            defaultMin={_min.odoReading || 0}
            defaultMax={_max.odoReading || Number.MAX_SAFE_INTEGER}
            handleChange={handleChange}
            searchParams={searchParams}
          />

          <Select
            label="Currency"
            name="currency"
            value={queryStates.currency || ""}
            onChange={handleChange}
            options={Object.values(CurrencyCode).map((value) => ({
              label: value,
              value,
            }))}
          />
          <Select
            label="Odometer Unit"
            name="odoUnit"
            value={queryStates.odoUnit || ""}
            onChange={handleChange}
            options={Object.values(OdoUnit).map((value) => ({
              label: formatOdometerUnit(value),
              value,
            }))}
          />
          <Select
            label="Transmission"
            name="transmission"
            value={queryStates.transmission || ""}
            onChange={handleChange}
            options={Object.values(Transmission).map((value) => ({
              label: formatTransmission(value),
              value,
            }))}
          />
          <Select
            label="Fuel Type"
            name="fuelType"
            value={queryStates.fuelType || ""}
            onChange={handleChange}
            options={Object.values(FuelType).map((value) => ({
              label: formatFuelType(value),
              value,
            }))}
          />
          <Select
            label="Body Type"
            name="bodyType"
            value={queryStates.bodyType || ""}
            onChange={handleChange}
            options={Object.values(BodyType).map((value) => ({
              label: formatBodyType(value),
              value,
            }))}
          />
          <Select
            label="Colour"
            name="colour"
            value={queryStates.colour || ""}
            onChange={handleChange}
            options={Object.values(Colour).map((value) => ({
              label: formatColour(value),
              value,
            }))}
          />
          <Select
            label="ULEZ Compliance"
            name="ulezCompliance"
            value={queryStates.ulezCompliance || ""}
            onChange={handleChange}
            options={Object.values(ULEZCompliance).map((value) => ({
              label: value,
              value,
            }))}
          />

          <Select
            label="Doors"
            name="doors"
            value={queryStates.doors || ""}
            onChange={handleChange}
            options={Array.from({ length: 6 }).map((_, i) => ({
              label: Number(i + 1).toString(),
              value: Number(i + 1).toString(),
            }))}
          />
          <Select
            label="Seats"
            name="seats"
            value={queryStates.seats || ""}
            onChange={handleChange}
            options={Array.from({ length: 8 }).map((_, i) => ({
              label: Number(i + 1).toString(),
              value: Number(i + 1).toString(),
            }))}
          />
        </div>
        <div className="flex flex-col space-y-2">
            <Button type="button"
             onClick={() => setOpen(false)}
            >
                Search {count > 0 ? `(${count})` : ""}
            </Button>
            {filtersCount > 0 && (
                <Button type="button"
                variant="outline"
                onClick={clearAllFilter}
                aria-disabled={filtersCount === 0 || !filtersCount}
                className={cn(`text-sm py-1`,
                    !filtersCount
                        ? "disabled opacity-50 pointer-events-none cursor-default"
                        : "hover:underline cursor-pointer"
                )}
                >
                    Clear all {filtersCount > 0 ? `(${filtersCount})` : ""}
                </Button>
             )}
        </div>
        </div>
        
      </DialogContent>
    </Dialog>
  );
};

export default DialogFilters;
