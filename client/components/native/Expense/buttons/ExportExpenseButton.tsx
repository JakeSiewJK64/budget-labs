"use client";

import { exportExpenseToCSV } from "@/actions/expense";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const ExportExpenseButton = (args: {
  start_date: string;
  end_date: string;
  user_id: string;
}) => {
  return (
    <form
      action={async () => {
        const res = await exportExpenseToCSV(args);
        const blob = new Blob([res], { type: "application/csv" });
        const url = URL.createObjectURL(blob);

        // reference: https://stackoverflow.com/a/74014505
        const a = document.createElement("a");
        a.href = url;
        a.download = "MyExpenses.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }}
    >
      <Button className="hover:bg-[#4ade80] bg-[#22c55e]" type="submit">
        <Download className="mr-2" size={20} /> Export to CSV
      </Button>
    </form>
  );
};
