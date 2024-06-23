import dayjs from "dayjs";
import { useGetCurrentUser, useGetExpenseStatsByUserId } from "@/hooks/queries";
import { GenericLineChart } from "@/components/charts";
import { DateRangeURLParam } from "@/types/global";
import { MONTHS_MAPPING } from "@/utils/json";

const threeMonthsPrior = dayjs().subtract(3, "months");
const endOfMonth = dayjs().endOf("month");

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

  const monthlyGrossExpenseStats = Object.keys(stats).map((key) => {
    return {
      name: MONTHS_MAPPING[parseInt(key) - 1],
      value: stats[key].current_month_highest,
    };
  });

  return (
    <>
      <GenericLineChart
        title="Gross Monthly Expense"
        data={monthlyGrossExpenseStats}
        width="100%"
        height={350}
      />
    </>
  );
};

export default Page;
