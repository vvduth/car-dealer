import CarCard from "@/components/inventory/car-card";
import CarsList from "@/components/inventory/cars-list";
import DialogFilters from "@/components/inventory/DialogFilters";
import { InventorySkeleton } from "@/components/inventory/inventory-skeleton";
import Sidebar from "@/components/inventory/sidebar";
import CustomPagination from "@/components/shared/custom-pagination";
import { CARS_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/routes";
import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { buildClassifiedFilterQuery } from "@/lib/utils";
import { ClassifiedStatus, Prisma } from "@prisma/client";
import React, { Suspense } from "react";
import { z } from "zod";



const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = z
    .string()
    .transform((value) => Math.max(Number(value), 1))
    .optional()
    .parse(searchParams?.page);

  // getthe current page from search params, default to 1
  const page = validPage ? validPage : 1;

  // cal the offset for pagination
  const offset = (page - 1) * CARS_PER_PAGE;
  
  return prisma.classified.findMany({
    where: buildClassifiedFilterQuery(searchParams),
    include: {
      images: {
        take: 1, // only take the first image
      },
    },
    skip: offset,
    take: CARS_PER_PAGE,
  });
};

//   searchParams: AwaitedPageProps["searchParams"] | undefined
// ): Prisma.ClassifiedWhereInput => {
//   const data = CarFilterSchema.safeParse(searchParams);
//   if (!data) {
//     return {
//       status: ClassifiedStatus.LIVE,
//     };
//   }

//   const keys = Object.keys(data);
//   const taxonomyFilters = ["make", "model", "modelVariant"];
//   const mapParamsToFields = keys.reduce(
//     (acc, key) => {
//       const value = searchParams?.[key] as string | undefined;
//       if (!value) return acc;

//       if (taxonomyFilters.includes(key)) {
//         acc[key] = { id: Number(value) };
//       }

//       return acc;
//     },
//     {} as { [key: string]: any }
//   );

//   return {
//     status: ClassifiedStatus.LIVE,
//     ...(searchParams?.q && {
//       OR: [
//         { title: { contains: searchParams.q, mode: "insensitive" as const } },
//         {
//           description: {
//             contains: searchParams.q,
//             mode: "insensitive" as const,
//           },
//         },
//       ],
//     }),
//     ...mapParamsToFields,
//   };
// };

const InventoryPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const cars = await getInventory(searchParams);
 
  const count = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  });

  const minMaxresult = await prisma.classified.aggregate({
    where: {
      status: ClassifiedStatus.LIVE,
    },
    _min: {
      year: true,
      price: true,
      odoReading: true,
    }, 
    _max: {
      price: true,
      year: true,
      odoReading: true,
    },
  })
  const sourceId = await getSourceId();
  const favs = await redis.get<Favourites>(sourceId ?? "");

  const totalPages = Math.ceil(count / CARS_PER_PAGE);
  return (
    <div className="flex">
      {/* <Sidebar/> */}
      <Sidebar minMaxValue={minMaxresult} searchParams={searchParams} />
      <div className="flex-1 p-4 bg-background">
        {/* add xl flex-row if u want */}
        <div className="flex space-y-2 flex-col items-center justify-center pb-4 -mt-1">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-sm md:text-base lg:text-xl font-semibold min-w-fit">
              {count} Cars Available
            </h2>
            {/* <DialogFilters/> */}
            <DialogFilters 
              searchParams={searchParams}
              minMaxValue={minMaxresult}
              count={count}
            />
          </div>
          <CustomPagination
            baseURL={routes.inventory}
            totalPages={totalPages}
            styles={{
              paginationRoot: "justify-end hidden lg:flex",
              paginationPrevious: "",
              paginationNext: "",
              paginationLink: "border active:border",
              paginationLinkActive: "bg-primary text-primary-foreground",
            }}
          />
          <Suspense
            fallback={<InventorySkeleton />}
          >
            <CarsList
              cars={cars}
              favourites={favs ? favs.ids : []}
            />
          </Suspense>
        </div>

        <CustomPagination 
          baseURL={routes.inventory}
          totalPages={totalPages}
          styles={{
            paginationRoot: "justify-center lg:hidden pt-12",
            paginationPrevious: "",
            paginationNext: "",
            paginationLink: "border active:border",
            paginationLinkActive: "bg-primary text-primary-foreground",
          }}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
