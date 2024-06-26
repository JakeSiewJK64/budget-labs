import { UserExpenseSettingsForm } from "@/components/form";
import { useGetCurrentUser } from "@/hooks/queries";

const Page = async () => {
  const user = await useGetCurrentUser();

  return (
    <>
      <h2 className="text-2xl font-extrabold">User Expense Settings</h2>
      <UserExpenseSettingsForm
        userId={String(user.id)}
        defaultValues={{
          income: user.income,
        }}
      />
    </>
  );
};

export default Page;
