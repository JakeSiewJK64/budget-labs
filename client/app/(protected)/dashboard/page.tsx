import { MdCalendarMonth } from "react-icons/md";
import { CiCoinInsert } from "react-icons/ci";
import { FaMoneyBill } from "react-icons/fa";
import { DashboardCards } from "@/components/native";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/hooks/queries/users";
import { useGetExpenseById } from "@/hooks/queries/expenses";
import { PaginationRequestSchema, PaginationURLParam } from "@/types/global";
import { GenericTable } from "@/components/native/GenericTable";
import { expenseColumns } from "@/lib/columns";

const Page = async ({ searchParams }: { searchParams: PaginationURLParam }) => {
  const user = await useGetCurrentUser();
  const expenses = await useGetExpenseById({
    ...PaginationRequestSchema.parse(searchParams),
    user_id: user.id,
  });

  return (
    <div className="flex flex-col">
      <p className="my-2">
        Welcome back,{" "}
        <strong>
          {user.first_name} {user.last_name}
        </strong>
      </p>
      <DashboardCards
        infoArray={[
          {
            color: "#f97316",
            title: "Total spending this month",
            value: 1000,
            icon: <FaMoneyBill color="white" />,
          },
          {
            color: "#ef4444",
            title: "Highest spending this month",
            value: 20,
            icon: <MdCalendarMonth color="white" />,
          },
          {
            color: "#4f46e5",
            title: "Total spending today",
            value: 10,
            icon: <CiCoinInsert color="white" />,
          },
        ]}
      />
      <div className="ml-auto">
        <Button>New Expense</Button>
      </div>
      <GenericTable
        className="border rounded mt-4"
        data={expenses.content}
        columns={expenseColumns}
      />
    </div>
  );
};

export default Page;
