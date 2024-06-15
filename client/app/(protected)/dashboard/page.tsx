import { DashboardCards } from "@/components/native";
import { Button } from "@/components/ui/button";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import { MdCalendarMonth } from "react-icons/md";
import { CiCoinInsert } from "react-icons/ci";
import { FaMoneyBill } from "react-icons/fa";
import { useGetCurrentUser } from "@/hooks/queries/users";
import { useGetExpenseById } from "@/hooks/queries/expenses";

const Page = async () => {
  const user = await useGetCurrentUser();
  const expenses = await useGetExpenseById({
    page: 0,
    page_size: 5,
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
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.content.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Page;
