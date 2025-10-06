"use client";
import { Button } from "@/components/ui/button";
import { FuelType, BodyType, Transmission, Colour, ULEZCompliance, OdoUnit, ClassifiedStatus, CurrencyCode } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React, { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCarAction } from "@/app/_actions/car";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import CarFormField from "../../car/car-form-fields";
import { CreateCarType, createCarSchema } from "@/app/schemas/car.schema";
import MultiImageUploader from "../../car/mutil-image-uploader";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


const CreateCarDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, startCreateTransition] = useTransition();

  const form = useForm<CreateCarType>({
    resolver: zodResolver(createCarSchema),
    defaultValues: {
      images: [],
      year: "",
      make: "",
      model: "",
      modelVariant: "",
      description: "",
      vrm: "",
      odoReading: undefined,
      price: undefined,
      doors: undefined,
      seats: undefined,
      fuelType: FuelType.PETROL,
      bodyType: BodyType.SEDAN,
      transmission: Transmission.AUTOMATIC,
      colour: Colour.BLACK,
      ulezCompliance: ULEZCompliance.EXEMPT,
      odoUnit: OdoUnit.MILES,
      status: ClassifiedStatus.FOR_SALE,
      currency: CurrencyCode.EUR,
    },
  });

  const onCreateSubmit: SubmitHandler<CreateCarType> = (data) => {
    startCreateTransition(async () => {
      const result = await createCarAction(data);
      if (result?.success) {
        toast.success("Success", {
          description: "Car created successfully",
          duration: 3000,
        });
        setIsModalOpen(false);
        form.reset();
      } else {
        toast.error("Error", {
          description: result?.message || "Something went wrong",
          duration: 3000,
        });
      }
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="ml-4" size={"sm"}>
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className={cn(`bg-card max-w-6xl`)}>        <DialogHeader>
          <DialogTitle>Create new car</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onCreateSubmit)}
          >
            <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CarFormField />
               <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field: { name, onChange } }) => (
                    <FormItem>
                      <FormLabel className="text-muted" htmlFor="images">
                        Images (up to 8)
                      </FormLabel>
                      <FormControl>
                        <MultiImageUploader name={name} onChange={onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={isCreating}
                type="submit"
                className="flex items-center gap-x-2"
              >
                {isCreating && <Loader2 className="animate-spin h-4 w-4" />}
                Create Car
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCarDialog;
