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

const getNumberedPagination = ({
  page,
  page_size,
  totalPages,
}: {
  totalPages: number;
  page_size: number;
  page: number;
}) => {
  const firstPage = (
    <PaginationItem key={0}>
      <PaginationLink
        className={cn(page === 0 && "pointer-events-none")}
        href={`?page=0&page_size=${page_size}`}
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
        href={`?page=${totalPages - 1}&page_size=${page_size}`}
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
            href={`?page=${i}&page_size=${page_size}`}
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
};

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
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={first ? "pointer-events-none text-gray-500" : ""}
            href={`?page_size=${paginationInfo.page_size}&page=${Number(
              paginationInfo.page - 1
            )}`}
          />
        </PaginationItem>
        {getNumberedPagination({
          page: paginationInfo.page,
          page_size: paginationInfo.page_size,
          totalPages,
        })}
        <PaginationItem>
          <PaginationNext
            className={last ? "pointer-events-none text-gray-500" : ""}
            href={`?page_size=${paginationInfo.page_size}&page=${Number(
              paginationInfo.page + 1
            )}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default GenericPagination;
