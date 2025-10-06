"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { forbidden, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { routes } from "@/config/routes";
import { CreateCustomerType, EditCustomerType } from "@/app/schemas/customer.schema";

export const createCustomerAction = async (data: CreateCustomerType) => {
  try {
    const newCustomer = await prisma.customer.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        bookingDate: data.date,
        classified: {
          connect: {
            slug: data.slug,
          },
        },
      },
    });
    return {
      success: true,
      message: `Thank you for your interest, ${newCustomer.firstName}. We will be in touch shortly.`,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to submit details",
    };
  }
};

export const updateCustomerAction = async (data: {
  id: number;
} & EditCustomerType) => {
  const session = await auth();
  if (!session?.user?.id) {
    return forbidden();
  }
  const userId = session.user.id;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: data.id },
      include: { classified: true },
    });

    if (!customer) {
      return { success: false, message: "Customer not found" };
    }

    const changes: { field: string; oldValue: any; newValue: any }[] = [];

    // Robustly compare and track changes, handling null/undefined/empty strings
    if (data.status !== customer.status) {
      changes.push({ field: 'status', oldValue: customer.status, newValue: data.status });
    }
    if (data.firstName !== customer.firstName) {
      changes.push({ field: 'firstName', oldValue: customer.firstName, newValue: data.firstName });
    }
    if (data.lastName !== customer.lastName) {
      changes.push({ field: 'lastName', oldValue: customer.lastName, newValue: data.lastName });
    }
    if (data.email !== customer.email) {
      changes.push({ field: 'email', oldValue: customer.email, newValue: data.email });
    }
    if ((data.mobile || "") !== (customer.mobile || "")) {
      changes.push({ field: 'mobile', oldValue: customer.mobile, newValue: data.mobile });
    }
    
    const effectiveOldTitle = customer.carTitle || customer.classified?.title || "";
    if ((data.carTitle || "") !== effectiveOldTitle) {
      changes.push({ field: 'carTitle', oldValue: effectiveOldTitle, newValue: data.carTitle });
    }

    if ((data.notes || "") !== (customer.notes || "")) {
      changes.push({ field: 'notes', oldValue: customer.notes, newValue: data.notes });
    }
    const oldDate = customer.bookingDate ? new Date(customer.bookingDate).toISOString() : null;
    const newDate = data.bookingDate ? new Date(data.bookingDate).toISOString() : null;
    if (newDate !== oldDate) {
      changes.push({ field: 'bookingDate', oldValue: customer.bookingDate, newValue: data.bookingDate });
    }

    await prisma.$transaction(async (tx) => {
      // 1. Update the customer
      await tx.customer.update({
        where: { id: data.id },
        data: {
          status: data.status,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          mobile: data.mobile,
          carTitle: data.carTitle,
          notes: data.notes,
          bookingDate: data.bookingDate,
        },
      });

      // 2. Create lifecycle logs for each change
      if (changes.length > 0) {
        const userExists = await tx.user.findUnique({ where: { id: userId } });
        if (!userExists) {
          throw new Error(`User with ID ${userId} not found for logging.`);
        }

        const lifecycleData = changes.map(change => ({
          customerId: customer.id,
          newStatus: data.status,     // Keep new status for context if needed, or adjust
          change: `Field '${change.field}' changed from '${change.oldValue || "empty"}' to '${change.newValue || "empty"}'`,
          updatedById: userId,
        }));
        
        for (const logEntry of lifecycleData) {
          await tx.customerLifecycle.create({ data: logEntry });
        }
      }
    });

    revalidatePath(routes.admin.customers);
    revalidatePath(routes.admin.editCustomer(data.id));

    return {
      success: true,
      message: `Customer updated successfully`,
    };
  } catch (error) {
    console.error("Update Customer Error:", error);
    return {
      success: false,
      message: "Failed to update customer",
    };
  }
};

export const createManualCustomerAction = async (data: EditCustomerType) => {
  const session = await auth();
  if (!session?.user?.id) {
    return forbidden();
  }

  try {
    await prisma.customer.create({
      data: {
        status: data.status,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        carTitle: data.carTitle,
        notes: data.notes,
        bookingDate: data.bookingDate,
      },
    });
  } catch (error) {
    console.error("Create Customer Error:", error);
    return {
      success: false,
      message: "Failed to create customer",
    };
  }

  revalidatePath(routes.admin.customers);
  redirect(routes.admin.customers);
};

export const deleteCustomerAction = async (id: number) => {
  const session = await auth();
  if (!session) {
    return forbidden();
  }

  try {
    await prisma.customer.delete({ where: { id } });
    revalidatePath(routes.admin.customers);
    return {
      success: true,
      message: "Customer deleted",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete customer",
    };
  }
};