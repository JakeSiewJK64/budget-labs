"use client";

import dayjs from "dayjs";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { ExpenseSchema } from "@/types/expense";
import { buttonVariants } from "@/components/ui/button";
import { ExpenseColumnDeleteButton } from "@/components/native/Expense";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const expenseColumns: ColumnDef<z.infer<typeof ExpenseSchema>>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: ({ header }) => {
      const param = useSearchParams();
      const sortByDate = param.get("sortBy") === header.id;
      const ascending = param.get("order") === "0";
      const newURL = new URLSearchParams(param.toString());
      const sortButton = () => {
        if (sortByDate) {
          if (ascending) {
            newURL.set("order", "1");
            return [<ArrowUp className="ml-2 h-4 w-4" />, newURL];
          }

          newURL.set("order", "0");
          return [<ArrowDown className="ml-2 h-4 w-4" />, newURL];
        }

        newURL.set("sortBy", header.id);
        return [<ArrowUpDown className="ml-2 h-4 w-4" />, newURL];
      };

      const [icon, url] = sortButton();

      return (
        <Link href={`?${url}`} className="flex flex-row gap-2 align-baseline">
          <p>Date</p>
          {icon}
        </Link>
      );
    },
    cell: (info) => dayjs(info.getValue() as string).format("YYYY-MM-DD"),
  },
  {
    accessorKey: "amount",
    header: ({ header }) => {
      const param = useSearchParams();
      const sortByAmount = param.get("sortBy") === header.id;
      const ascending = param.get("order") === "0";
      const newURL = new URLSearchParams(param.toString());
      const sortButton = () => {
        if (sortByAmount) {
          if (ascending) {
            newURL.set("order", "1");
            return [<ArrowUp className="ml-2 h-4 w-4" />, newURL];
          }

          newURL.set("order", "0");
          return [<ArrowDown className="ml-2 h-4 w-4" />, newURL];
        }

        newURL.set("sortBy", header.id);
        return [<ArrowUpDown className="ml-2 h-4 w-4" />, newURL];
      };

      const [icon, url] = sortButton();

      return (
        <Link href={`?${url}`} className="flex flex-row gap-2 align-baseline">
          <p>Amount</p>
          {icon}
        </Link>
      );
    },
  },
  {
    header: "",
    accessorKey: "id",
    cell: (info) => (
      <div className="flex flex-row gap-1">
        <a className={buttonVariants()} href={`/expenses/${info.getValue()}`}>
          View Details
        </a>
        <ExpenseColumnDeleteButton expense_id={String(info.getValue())} />
      </div>
    ),
  },
];
