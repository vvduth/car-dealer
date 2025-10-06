import EditCustomerForm from "@/components/admin/customers/EditCustomerForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerBadgeMap } from "@/config/constants";
import { routes } from "@/config/routes";
import { PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { formatCustomerStatus, formatSimpleDate } from "@/lib/utils";
import { format } from "date-fns";
import { PencilIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";

const EditCustomerPage = async (props: PageProps) => {
  const params = await props.params;
  const { data, success } = z
    .object({
      id: z.number(),
    })
    .safeParse({
      id: Number(params?.id),
    });
  if (!success || !data.id) {
    redirect(routes.admin.customers);
  }
  const customer = await prisma.customer.findUnique({
    where: {
      id: data.id,
    },
    include: {
      classified: true,
      lifecycle: {
        include: {
          updatedBy: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!customer) {
    redirect(routes.admin.customers);
  }
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-2xl">Customer Details</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-7xl bg-gray-950 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Edit Customer Details</DialogTitle>
            </DialogHeader>
            <div className="py-4 overflow-y-auto">
              <EditCustomerForm customer={customer} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Static Info Cards */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-background">
               <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium text-white">{`${customer.firstName} ${customer.lastName}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-white">{customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mobile</span>
                <span className="font-medium text-white">{customer.mobile || "-"}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Status & Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-background">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={CustomerBadgeMap[customer.status]}>
                  {formatCustomerStatus(customer.status)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booking Date</span>
                <span className="font-medium text-white">{customer.bookingDate ? formatSimpleDate(customer.bookingDate) : "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Terms Accepted</span>
                <span className="font-medium text-white">{customer.termsAccepted ? "Yes" : "No"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-100">Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer ID</span>
              <span className="font-medium text-white">{customer.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Interested In (Car Title)</span>
              <span className="font-medium text-white text-right">{customer.carTitle || customer.classified?.title || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium text-white">{format(customer.createdAt, "do MMM yyy HH:mm")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium text-white">{format(customer.updatedAt, "do MMM yyy HH:mm")}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-100">Customer Lifecycle</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="w-[50%] text-white">Change</TableHead>
                  <TableHead className="text-white">Updated By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer.lifecycle.length > 0 ? (
                  customer.lifecycle.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="text-gray-300">{format(entry.updatedAt, "do MMM yyy HH:mm")}</TableCell>
                      <TableCell>
                        <Badge variant={CustomerBadgeMap[entry.newStatus]}>
                          {formatCustomerStatus(entry.newStatus)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{entry.change}</TableCell>
                      <TableCell className="text-gray-300">{entry.updatedBy?.email || "N/A"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No lifecycle events found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EditCustomerPage;
