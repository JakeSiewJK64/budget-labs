import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const GenericPagination = ({
  paginationInfo,
  first,
  last,
  totalPages,
}: {
  totalPages: number;
  first?: boolean;
  last?: boolean;
  paginationInfo: { page: number; page_size: number };
}) => {
  const { page } = paginationInfo;
  const pathname = useSearchParams();

  const updateURL = ({ key, value }: { key: string; value: string }) => {
    const newURL = new URLSearchParams(pathname.toString());
    newURL.set(key, value);
    return `?${newURL.toString()}`;
  };

  const getNumberedPagination = useCallback(() => {
    const firstPage = (
      <PaginationItem key={0}>
        <PaginationLink
          className={cn(page === 0 && "pointer-events-none")}
          href={updateURL({ key: "page", value: "0" })}
          isActive={page === 0}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    const lastPage = (
      <PaginationItem key={totalPages}>
        <PaginationLink
          className={cn(page === totalPages - 1 && "pointer-events-none")}
          href={updateURL({ key: "page", value: String(totalPages - 1) })}
          isActive={page === totalPages - 1}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );

    if (totalPages === 0) {
      return [firstPage];
    }

    const pages = [];
    const currentPage = page;

    pages.push(firstPage);

    for (let i = 1; i < totalPages - 1; i++) {
      if (i === currentPage || i === currentPage - 1 || i === currentPage + 1) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={updateURL({ key: "page", value: `${i}` })}
              isActive={i === page}
              className={cn(i === page && "pointer-events-none")}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    if (totalPages > 1) {
      pages.push(lastPage);
    }

    return pages;
  }, [totalPages, paginationInfo, last, first]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={first ? "pointer-events-none text-gray-500" : ""}
            href={updateURL({
              key: "page",
              value: String(paginationInfo.page - 1),
            })}
          />
        </PaginationItem>
        {getNumberedPagination()}
        <PaginationItem>
          <PaginationNext
            className={last ? "pointer-events-none text-gray-500" : ""}
            href={updateURL({
              key: "page",
              value: String(paginationInfo.page + 1),
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default GenericPagination;
