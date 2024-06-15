"use client";

import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { ExpenseSchema } from "@/types/expense";

export const expenseColumns: ColumnDef<z.infer<typeof ExpenseSchema>>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
