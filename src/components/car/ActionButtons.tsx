"use client";
import { deleteCarAction } from "@/app/_actions/car";
import { CarWithImages } from "@/config/types";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { EyeIcon, Loader2, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { Tooltip } from "react-tooltip";
const ActionButtons = ({ car }: { car: CarWithImages }) => {
  const [isPending, startTransition] = useTransition();
  const deleteCar = (id: number) => {
    startTransition(async () => {
      // delete car logic here
      const result = await deleteCarAction(id);
      if (result.success) {
        toast.success("Car deleted successfully", {
          description: result.message,
        });
      } else {
        toast.error("Failed to delete car", {
          description: result.message,
        });
      }
    });
  };
  return (
    <>
      <Button
        variant={"destructive"}
        className="p-2 h-fit"
        onClick={() => deleteCar(car.id)}
        data-tooltip-id="trash-tooltip"
        data-tooltip-content="Delete Car"
      >
        <Tooltip id="trash-tooltip" />
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
      </Button>
      <Button
        className="p-2 h-fit bg-white hover:bg-gray-200 text-gray-800"
        asChild
        data-tooltip-id="view-tooltip"
        data-tooltip-content="View Car"
      >
        <Link href={routes.singleClassified(car.slug)}>
          <Tooltip id="view-tooltip" />
          <EyeIcon className="h-4 w-4" />
        </Link>
      </Button>
      <Button className="p-2 h-fit bg-blue-600 hover:bg-blue-700 text-white" asChild
        data-tooltip-id="edit-tooltip"
        data-tooltip-content="Edit Car"
      >
        <Link href={routes.admin.editCar(car.id)}>
            <Tooltip id="edit-tooltip" />
          <PencilIcon className="h-4 w-4" />
        </Link>
      </Button>
    </>
  );
};

export default ActionButtons;
