
import { CustomerStatus } from "@prisma/client";
import slug from "slug";
import { z } from "zod";
export const SubmitDetailsSchema = z.object({
	firstName: z.string({ message: "firstName is required" }),
	lastName: z.string({ message: "lastName is required" }),
	email: z.string({ message: "email is required" }),
	mobile: z.string({ message: "mobile is required" }),
	terms: z.enum(["true", "false"], {
		message: "You must agree to the terms and conditions",
	}),
});

export type SubmitDetailsSchemaType = z.infer<typeof SubmitDetailsSchema>;
export const CreateCustomerSchema = SubmitDetailsSchema.extend({
	date: z.date(),
	slug: z.string(),


})

export type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;

export const editCustomerSchema = z.object({
  status: z.nativeEnum(CustomerStatus),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email(),
  mobile: z.string().optional(),
  carTitle: z.string().optional(),
  notes: z.string().optional(),
  bookingDate: z.coerce.date().optional(),
});

export type EditCustomerType = z.infer<typeof editCustomerSchema>;


export const UpdateCustomerSchema = editCustomerSchema.extend({
	id: z.number()
})