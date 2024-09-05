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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AssetPagination = ({ page, total, pages, nextPage, prevPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePage = (value) => {
    const params = new URLSearchParams(searchParams.entries());
    params.set("page", value);
    const query = `?page=${value}`;
    router.push(`${pathname}${query}`);
  };

  if (pages > 1)
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!prevPage}
              onClick={() => handlePage(prevPage)}
            />
          </PaginationItem>
          {prevPage && (
            <>
              <PaginationItem>
                <PaginationEllipsis
                  className="cursor-pointer"
                  onClick={() => handlePage(1)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => handlePage(prevPage)}>
                  {prevPage}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink href="#" isActive={true}>
              {page}
            </PaginationLink>
          </PaginationItem>
          {nextPage && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => handlePage(nextPage)}>
                  {nextPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis
                  className="cursor-pointer"
                  onClick={() => handlePage(pages)}
                />
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              disabled={!nextPage}
              onClick={() => handlePage(nextPage)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
};

export default AssetPagination;
