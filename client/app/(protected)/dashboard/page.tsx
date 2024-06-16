import { MdCalendarMonth } from "react-icons/md";
import { CiCoinInsert } from "react-icons/ci";
import { FaMoneyBill } from "react-icons/fa";
import { DashboardCards, ExpenseModal } from "@/components/native";
import { useGetCurrentUser } from "@/hooks/queries/users";
import { useGetExpenseById } from "@/hooks/queries/expenses";
import { PaginationRequestSchema, PaginationURLParam } from "@/types/global";
import { GenericTable } from "@/components/native/GenericTable";
import { expenseColumns } from "@/lib/columns";

const Page = async ({ searchParams }: { searchParams: PaginationURLParam }) => {
  const user = await useGetCurrentUser();
  const paginationInfo = PaginationRequestSchema.parse(searchParams);
  const expenses = await useGetExpenseById({
    page: paginationInfo.page,
    page_size: paginationInfo.page_size,
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
        <ExpenseModal userId={String(user.id)} />
      </div>
      <GenericTable
        paginationInfo={paginationInfo}
        className="border rounded mt-4"
        last={expenses.last}
        first={expenses.first}
        data={expenses.content}
        columns={expenseColumns}
        totalElements={expenses.totalElements}
        totalPages={expenses.totalPages}
      />
    </div>
  );
};

export default Page;
