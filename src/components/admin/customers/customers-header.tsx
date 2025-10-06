import RadioFilter from "@/components/shared/radio-filter";
import { routes } from "@/config/routes";
import type { AwaitedPageProps } from "@/config/types";
import { CustomerStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const AdminCustomersHeader = ({ searchParams }: AwaitedPageProps) => {
	return (
		<div className="flex flex-col p-6 space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="font-semibold text-lg md:text-2xl text-slate-200">All Customers</h1>
				<div className="flex items-center justify-end gap-x-4">
          <Link href={routes.admin.newCustomer}>
            <Button variant="default">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </Link>
					<RadioFilter
						items={["ALL", ...Object.values(CustomerStatus)]}
						searchParams={searchParams}
					/>
				</div>
			</div>
		</div>
	);
};