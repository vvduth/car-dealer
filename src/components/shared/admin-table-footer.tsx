"use client";
import type { AwaitedPageProps, FilterOptions } from "@/config/types";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect } from "react";
import { Select } from "../ui/select";
import { TableCell, TableFooter, TableRow } from "../ui/table";
import CustomPagination from "./custom-pagination";
const itemsPerPageOptions: FilterOptions<string, string> = [
	{ label: "10", value: "10" },
	{ label: "25", value: "25" },
	{ label: "50", value: "50" },
	{ label: "100", value: "100" },
];

interface AdminTableFooterProps extends AwaitedPageProps {
	disabled: boolean;
	totalPages: number;
	baseURL: string;
	cols: number;
}

export const AdminTableFooter = (props: AdminTableFooterProps) => {
    const { disabled, totalPages, baseURL, cols, searchParams } = props;
	const itemsPerPage = searchParams?.itemsPerPage || "10";
	const router = useRouter();

    const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set(e.target.name, e.target.value);
        const url = new URL(window.location.href);
        url.search = currentUrlParams.toString();
        router.push(url.toString());
    }

    useEffect(() => {
        const currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set("itemsPerPage", itemsPerPage as string);
        const url = new URL(window.location.href);
        url.search = currentUrlParams.toString();
        router.push(url.toString());
    },[router, itemsPerPage]);

    return (
        <TableFooter className="border-primary-800">
            <TableRow className="bg-primary hover:bg-yellow-500">
                <TableCell 
                    colSpan={cols}
                >
                    <div className="flex items-center">
                                            <Select
                                              value={searchParams.itemsPerPage || "10"}
                                              options={["10", "20", "50"].map((value) => ({
                                                label: `Show ${value}`,
                                                value,
                                              }))}                                    onChange={(e) => {
                                      const url = new URL(baseURL, window.location.origin);
                                      url.searchParams.set("itemsPerPage", e.target.value);
                                      router.push(url.toString());
                                    }}
                                    noDefault
                                  />                        <CustomPagination 
                            totalPages={totalPages}
                            baseURL={baseURL}
                            styles={{
                                paginationRoot: "justify-end",
                                paginationPrevious: "border-none hover:bg-primary-800 text-muted",
                                paginationNext: "hover:bg-primary-800 text-muted",
                                paginationLink: "border-none hover:bg-primary-800 text-muted",
                                paginationLinkActive: "bg-primary-800 text-white",

                            }}
                        />
                    </div>
                </TableCell>
            </TableRow>
        </TableFooter>
    )

    return <>
    </>
}