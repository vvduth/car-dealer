"use client";
import React from "react";
import { CarWithImages } from "@/config/types";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { formatCarStatus, formatColour, formatPrice } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { CarBadgeMap } from "@/config/constants";
import { format } from "date-fns";
import ActionButtons from "./ActionButtons";
const CarsTableRow = ({ car }: { car: CarWithImages }) => {
  return (
    <TableRow className="text-gray-500 border-white/45">
      <TableCell className="font-medium">{car.id}</TableCell>
      <TableCell className="p-0">
		<Image
		  src={car.images?.[0]?.src || "/placeholder.png"}
		  alt={car.images?.[0]?.alt || "Car Image"}
		  width={120}
		  height={100}
		  className="aspect-3/2 object-cover rounded"
        />
      </TableCell>
      <TableCell className="hidden md:table-cell">{car.title}</TableCell>
      <TableCell className="hidden md:table-cell">
        {formatPrice({
          price: car.price,
          currency: car.currency || "EUR",
        })}
      </TableCell>
      <TableCell className="hidden md:table-cell">{car.vrm}</TableCell>
      <TableCell className="hidden md:table-cell">
        {formatColour(car.colour)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant={CarBadgeMap[car.status]}>
          {formatCarStatus(car.status)}
        </Badge>
      </TableCell>
        <TableCell className="hidden md:table-cell">
            {format(car.createdAt, "dd/MM/yyyy")}
        </TableCell>
        <TableCell>
            {car.views}
        </TableCell>
        <TableCell className="flex gap-x-2">
            <ActionButtons
                car={car}
                />
        </TableCell>
    </TableRow>
  );
};

export default CarsTableRow;
