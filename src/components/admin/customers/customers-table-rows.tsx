import { CustomerBadgeMap } from "@/config/constants";
import type { CustomerWithCar } from "@/config/types";
import { formatCustomerStatus } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

import { CustomerActionButtons } from "./action-button";
import { TableCell, TableRow } from "@/components/ui/table";

export const CustomerTableRow = (customer: CustomerWithCar) => {
	return (
		<TableRow className="text-muted/75 border-white/5 hover:bg-primary-300">
			<TableCell className="font-medium">{customer.id}</TableCell>
			<TableCell className="font-medium">
				<Badge
					className="text-muted/75"
					variant={CustomerBadgeMap[customer.status]}
				>
					{formatCustomerStatus(customer.status)}
				</Badge>
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{customer.firstName} {customer.lastName}
			</TableCell>
			<TableCell className="hidden md:table-cell">{customer.email}</TableCell>
			<TableCell className="hidden md:table-cell">{customer.mobile}</TableCell>
			<TableCell className="hidden md:table-cell">
				{customer.carTitle || customer.classified?.title || "N/A"}
        {customer.classified?.vrm && ` (${customer.classified.vrm})`}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{format(customer.createdAt, "do MMM yyy HH:mm")}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{format(customer.updatedAt, "do MMM yyy HH:mm")}
			</TableCell>
			<TableCell>
				{customer.bookingDate
					? format(customer.bookingDate, "do MMM yyy HH:mm")
					: "N/A"}
			</TableCell>
			<TableCell className="flex gap-x-2">
				<CustomerActionButtons customer={customer} />
			</TableCell>
		</TableRow>
	);
};