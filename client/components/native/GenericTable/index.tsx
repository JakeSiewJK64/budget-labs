"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  last?: boolean;
  first?: boolean;
  paginationInfo?: { page: number; page_size: number };
  totalElements?: number;
  totalPages?: number;
  pageOptions?: string[];
}

const getNumberedPagination = ({
  page,
  page_size,
  totalPages,
}: {
  totalPages: number;
  page_size: number;
  page: number;
}) => {
  const pages = [];
  const currentPage = page;

  const firstPage = (
    <PaginationItem key={0}>
      <PaginationLink
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
        href={`?page=${totalPages - 1}&page_size=${page_size}`}
        isActive={page === totalPages - 1}
      >
        {totalPages}
      </PaginationLink>
    </PaginationItem>
  );

  pages.push(firstPage);

  for (let i = 1; i < totalPages - 1; i++) {
    if (i === currentPage || i === currentPage - 1 || i === currentPage + 1) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`?page=${i}&page_size=${page_size}`}
            isActive={i === page}
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

  pages.push(lastPage);

  return pages;
};

export function GenericTable<TData, TValue>({
  columns,
  data,
  className,
  last,
  first,
  paginationInfo = { page: 0, page_size: 10 },
  totalElements = 0,
  totalPages = 0,
  pageOptions = ["5", "10", "25"],
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex flex-row justify-end my-4 gap-4">
        <p>
          Total: <strong>{totalElements}</strong>
        </p>
        <p>
          Total Pages: <strong>{totalPages}</strong>
        </p>
      </div>
      <div className="flex flex-row justify-end align-baseline gap-2">
        <strong className="my-auto">Page Size:</strong>
        <Select
          defaultValue={String(paginationInfo.page_size)}
          onValueChange={(value) => {
            redirect(`?page_size=${value}&page=0`);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={pageOptions[0]} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {pageOptions.map((option) => (
                <SelectItem value={option} key={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex justify-end">
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
        </div>
      </div>
      <div className={className}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
