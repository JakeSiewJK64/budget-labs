"use client";

import dayjs from "dayjs";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { ExpenseSchema } from "@/types/expense";
import { buttonVariants } from "@/components/ui/button";
import { ExpenseColumnDeleteButton } from "@/components/native/Expense";
import { SortHeader } from "@/components/native/GenericTable";

export const expenseColumns: ColumnDef<z.infer<typeof ExpenseSchema>>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: ({ header }) => <SortHeader headerId={header.id} />,
    cell: (info) => dayjs(info.getValue() as string).format("YYYY-MM-DD"),
  },
  {
    accessorKey: "amount",
    header: ({ header }) => <SortHeader headerId={header.id} />,
  },
  {
    header: "",
    accessorKey: "id",
    cell: (info) => (
      <div className="flex flex-row gap-1">
        <a
          className={buttonVariants({ size: "sm" })}
          href={`/expenses/${info.getValue()}`}
        >
          View Details
        </a>
        <ExpenseColumnDeleteButton expense_id={String(info.getValue())} />
      </div>
    ),
  },
];
