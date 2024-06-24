import dayjs from "dayjs";
import { useGetCurrentUser, useGetExpenseStatsByUserId } from "@/hooks/queries";
import { GenericLineChart } from "@/components/charts";
import { DateRangeURLParam } from "@/types/global";
import { MONTHS_MAPPING } from "@/utils/json";

const threeMonthsPrior = dayjs().subtract(3, "months");
const endOfMonth = dayjs().endOf("month");
const currentMonth = dayjs().get("month") + 1;

const Page = async ({ searchParams }: { searchParams: DateRangeURLParam }) => {
  const user = await useGetCurrentUser();
  const stats = await useGetExpenseStatsByUserId({
    user_id: user.id,
    start_date: (searchParams.start_date
      ? dayjs(searchParams.start_date)
      : threeMonthsPrior
    ).format("YYYY-MM-DD"),
    end_date: (searchParams.end_date
      ? dayjs(searchParams.end_date)
      : endOfMonth
    ).format("YYYY-MM-DD"),
  });

  const currentDayExpenses = (stats[currentMonth]?.expense_arr ?? []).map((expense) => ({
    name: dayjs(expense.date).format("YYYY-MM-DD"),
    value: expense.amount,
  }));

  const monthlyGrossExpenseStats = Object.keys(stats).map((key) => {
    return {
      name: MONTHS_MAPPING[parseInt(key) - 1],
      value: stats[key].total_expense,
    };
  });

  const HighestMonthlyExpense = Object.keys(stats).map((key) => {
    return {
      name: MONTHS_MAPPING[parseInt(key) - 1],
      value: stats[key].current_month_highest,
    };
  });

  return (
    <>
      <GenericLineChart
        description="Total expenditure on that month."
        title="Gross Monthly Expense"
        data={monthlyGrossExpenseStats}
        width="100%"
        height={350}
        dataLines={[
          {
            dataKey: "value",
          },
        ]}
      />
      <GenericLineChart
        description="Highest expenditure on that month."
        title="Highest Monthly Expense"
        data={HighestMonthlyExpense}
        width="100%"
        height={350}
        dataLines={[
          {
            dataKey: "value",
          },
        ]}
      />
      <GenericLineChart
        description="Expense trend for current month."
        title="Expense Trend"
        data={currentDayExpenses}
        width="100%"
        height={350}
        dataLines={[
          {
            dataKey: "value",
            label: "(MYR) Amount",
          },
        ]}
      />
    </>
  );
};

export default Page;
