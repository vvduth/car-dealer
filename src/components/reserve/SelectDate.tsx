"use client";
import {
  MultiStepFormEnum,
  MultiStepsFormComponentProps,
} from "@/config/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { routes } from "@/config/routes";
import { generataTimeOptions, generateDateOptions } from "@/lib/utils";
import { env } from "process";
const SelectDateSchema = z.object({
  handoverDate: z.string({
    message: "Handover date is required",
  }),
  // Add other fields as necessary
  handoverTime: z.string({
    message: "Handover time is required",
  }),
});
type SelectDateType = z.infer<typeof SelectDateSchema>;
const SelectDate = (props: MultiStepsFormComponentProps) => {
  const { searchParams } = props;
  const handoverDate = (searchParams?.handoverDate as string) || undefined;
  const handoverTime = (searchParams?.handoverTime as string) || undefined;
  const form = useForm<SelectDateType>({
    resolver: zodResolver(SelectDateSchema),
    mode: "onBlur",
    defaultValues: {
      handoverDate: handoverDate
        ? decodeURIComponent(handoverDate)
        : handoverDate, // Decode the date if it exists
      handoverTime: handoverTime
        ? decodeURIComponent(handoverTime)
        : handoverTime, // Decode the time if it exists
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPreviousPending, startPreviousTransition] = useTransition();

  const prevStep = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const url = new URL(window.location.href);
      url.searchParams.set("step", MultiStepFormEnum.WELCOME.toString());
      router.push(url.toString());
    });
  };

  const onSelectDate: SubmitHandler<SelectDateType> = async (data) => {
    startTransition(async () => {
      const valid = await form.trigger();
      if (!valid) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use relative URL for client-side navigation
      const url = new URL(
        routes.reserve(props.car.slug, MultiStepFormEnum.SUBMIT_DETAILS),
        window.location.origin
      );
      url.searchParams.set(
        "handoverDate",
        encodeURIComponent(data.handoverDate)
      );
      url.searchParams.set(
        "handoverTime",
        encodeURIComponent(data.handoverTime)
      );
      router.push(url.toString());
    });
  };
  return (
    <Form {...form}>
      <form
        className="mx-auto bg-white  flex flex-col rounded-b-lg shadow-lg p-6 h-96"
        action=""
        onSubmit={form.handleSubmit(onSelectDate)}
      >
        <div className="space-y-6 flex-1 ">
          <FormField
            control={form.control}
            name="handoverDate"
            render={({ field: { ref, ...rest } }) => (
              <FormItem>
                <FormLabel htmlFor="handoverDate">
                  Select Handover Date
                </FormLabel>
                <FormControl>
                  <Select options={generateDateOptions()} {...rest} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="handoverTime"
            render={({ field: { ref, ...rest } }) => (
              <FormItem>
                <FormLabel htmlFor="handoverTime">
                  Select Handover Time
                </FormLabel>
                <FormControl>
                  <Select options={generataTimeOptions()} {...rest} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-x-4">
          <Button
            type="button"
            onClick={prevStep}
            disabled={isPreviousPending}
            className="uppercase font-bold flex gap-x-3 w-full flex-1"
          >
            {isPreviousPending ? (
              <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
            ) : null}{" "}
            BACK
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="uppercase font-bold flex gap-x-3 w-full flex-1"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
            ) : null}{" "}
            Continue 🎯
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SelectDate;
