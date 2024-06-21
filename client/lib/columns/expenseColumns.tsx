"use client";

import dayjs from "dayjs";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { ExpenseSchema } from "@/types/expense";
import { buttonVariants } from "@/components/ui/button";
import { ExpenseColumnDeleteButton } from "@/components/native/Expense";

export const expenseColumns: ColumnDef<z.infer<typeof ExpenseSchema>>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => dayjs(info.getValue() as string).format("YYYY-MM-DD"),
  },
  {
    accessorKey: "amount",
    header: "Amount",
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
