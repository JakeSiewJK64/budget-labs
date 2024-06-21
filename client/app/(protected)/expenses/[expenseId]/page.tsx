import { CopyClipboardButton } from "@/components/native/CopyClipboardButton";
import { ExpenseEditSection } from "@/components/native/Expense";
import { useGetExpenseById } from "@/hooks/queries";
import { useGetCurrentUser } from "@/hooks/queries/users";

const Page = async ({ params }: { params: { expenseId: string } }) => {
  const user = await useGetCurrentUser();
  const expense = await useGetExpenseById({
    expense_id: params.expenseId,
    user_id: user.id,
  });

  return (
    <div className="m-2">
      <div className="flex flex-row gap-4 items-baseline">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
          Expense ID: {params.expenseId}
        </h1>
        <CopyClipboardButton text={params.expenseId} />
      </div>
      <ExpenseEditSection defaultValues={expense} userId={String(user.id)} />
    </div>
  );
};

export default Page;
