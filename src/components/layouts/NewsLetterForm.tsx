"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubscribeSchema, SubscribeSchemaType } from "@/app/schemas/sub.schema";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { subscribeAction } from "@/app/_actions/subscribe";
import { toast } from "sonner";

const NewsLetterForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SubscribeSchemaType>({
    resolver: zodResolver(SubscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: SubscribeSchemaType) => {
    startTransition(async () => {
      const response = await subscribeAction(data);
      if (response.success) {
        toast.success("Subscribed!", {
          description: response.message,
        });
        form.reset();
      } else {
        toast.error("Error", {
          description: response.message,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-md items-center space-x-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" disabled={isPending}>
          {isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
};

export default NewsLetterForm;
