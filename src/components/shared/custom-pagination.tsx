"use client";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";

interface PaginationProps {
  baseURL: string;
  totalPages: number;
  maxVisiblePages?: number;
  styles: {
    paginationRoot: string;
    paginationPrevious: string;
    paginationNext: string;
    paginationLink: string;
    paginationLinkActive: string;
  };
}
const CustomPagination = ({
  baseURL,
  totalPages,
  maxVisiblePages = 5,
  styles: {
    paginationRoot,
    paginationPrevious,
    paginationNext,
    paginationLink,
    paginationLinkActive,
  },
}: PaginationProps) => {
  const [currentPage, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => {
      const parse = parseInt(value, 10);
      return Number.isNaN(parse) || parse < 1 ? 1 : parse;
    },
    serialize: (value) => {
      return value.toString();
    },
    shallow: false,
  });
  const [visibleRange, setVisibleRange] = useState({
    start: 1,
    end: Math.min(maxVisiblePages, totalPages),
  });

  useEffect(() => {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    const newStart = Math.max(
      1,
      Math.min(currentPage - halfVisible, totalPages - maxVisiblePages + 1)
    );
    const newEnd = Math.min(newStart + maxVisiblePages - 1, totalPages);
    setVisibleRange({ start: newStart, end: newEnd });
  }, [currentPage, totalPages, maxVisiblePages]);

  const createPageUrl = (pageNumber: number) => {
    const url = new URL(baseURL, window.location.origin);
    url.searchParams.set("page", pageNumber.toString());
    return url.toString();
  };
  const handleEllipsisClick = (direction: "left" | "right") => {
    const newPage =
      direction === "left"
        ? Math.max(1, visibleRange.start - maxVisiblePages)
        : Math.min(totalPages, visibleRange.end + maxVisiblePages);

    setPage(newPage);
  };

  return (
    <Pagination className={paginationRoot}>
      <PaginationContent className="lg:gap-4">
        <PaginationItem>
          <PaginationPrevious
            className={cn(currentPage <= 1 && "hidden", paginationPrevious)}
            href={createPageUrl(currentPage - 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setPage(currentPage - 1);
            }}
          />
        </PaginationItem>
        {visibleRange.start > 1 && (
          <PaginationItem className="hidden lg:block">
            <PaginationLink
              className={paginationLink}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleEllipsisClick("left");
              }}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}
       
        {Array.from({length: visibleRange.end - visibleRange.start + 1 }, (_, index)  => 
        visibleRange.start + index).map((pageNumber) => {
            const isActive = pageNumber === currentPage;
            let rel = "";
            if (pageNumber === currentPage -1) {
                rel = "prev";
            }
            if (pageNumber === currentPage + 1) {
                rel = "next";
            }
            return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    className={cn(
                      paginationLink,
                      isActive && paginationLinkActive
                    )}
                    href={createPageUrl(pageNumber)}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(pageNumber);
                    }}
                    {...rel ? { rel } : {}}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
            )
        })}

        {visibleRange.end < totalPages && (
          <PaginationItem className="hidden lg:block">
            <PaginationLink
              className={paginationLink}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleEllipsisClick("right");
              }}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className={cn(
              currentPage >= totalPages && "hidden",
              paginationNext
            )}
            href={createPageUrl(currentPage + 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setPage(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
