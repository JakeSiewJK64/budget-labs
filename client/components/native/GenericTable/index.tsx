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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GenericPagination from "./GenericPagination";

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
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("page", "0");
            searchParams.set("page_size", value);
            window.location.search = searchParams.toString();
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
          <GenericPagination
            first={first}
            last={last}
            paginationInfo={paginationInfo}
            totalPages={totalPages}
          />
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
