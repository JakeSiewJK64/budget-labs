import dayjs from "dayjs";
import { MdCalendarMonth, MdCheckCircle } from "react-icons/md";
import { CiCoinInsert } from "react-icons/ci";
import { FaMoneyBill } from "react-icons/fa";
import { useGetCurrentUser } from "@/hooks/queries/users";
import {
  useGetAllExpensesById,
  useGetExpenseStatsByUserId,
} from "@/hooks/queries/expenses";
import {
  DateRangeURLParam,
  PaginationRequestSchema,
  PaginationURLParam,
} from "@/types/global";
import { expenseColumns } from "@/lib/columns";
import { DateRangePicker } from "@/components/native";
import { GenericTable } from "@/components/native/GenericTable";
import { ExpenseModal } from "@/components/native/Expense";
import { DashboardCards } from "@/components/native/Dashboard";

const Page = async ({
  searchParams,
}: {
  searchParams: PaginationURLParam & DateRangeURLParam;
}) => {
  const user = await useGetCurrentUser();
  const paginationInfo = PaginationRequestSchema.parse(searchParams);
  const currentMonthValue = String(dayjs().month() + 1);
  const stats = await useGetExpenseStatsByUserId({
    user_id: user.id,
    start_date: (searchParams.start_date
      ? dayjs(searchParams.start_date)
      : dayjs().startOf("month")
    ).format("YYYY-MM-DD"),
    end_date: (searchParams.end_date
      ? dayjs(searchParams.end_date)
      : dayjs().endOf("month")
    ).format("YYYY-MM-DD"),
  });
  const expenses = await useGetAllExpensesById({
    page: paginationInfo.page,
    page_size: paginationInfo.page_size,
    user_id: user.id,
    start_date: searchParams.start_date,
    end_date: searchParams.end_date,
  });

  return (
    <div className="flex flex-col">
      <p className="my-2">
        Welcome back,{" "}
        <strong>
          {user.first_name} {user.last_name}
        </strong>
      </p>
      <DateRangePicker />
      <DashboardCards
        infoArray={[
          {
            color: "#f97316",
            title: "Total spending this month",
            value: stats[currentMonthValue].total_expense,
            icon: <FaMoneyBill color="white" />,
          },
          {
            color: "#ef4444",
            title: "Highest spending this month",
            value: stats[currentMonthValue].current_month_highest,
            icon: <MdCalendarMonth color="white" />,
          },
          {
            color: "#4f46e5",
            title: "Highest spending today",
            value: stats[currentMonthValue].current_day_highest,
            icon: <CiCoinInsert color="white" />,
          },
          {
            color: "#f1c40f",
            title: "Total spending today",
            value: stats[currentMonthValue].current_day_total,
            icon: <MdCheckCircle color="white" />,
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
