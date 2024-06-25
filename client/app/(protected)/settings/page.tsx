import { UserExpenseSettingsForm, UserSettingsForm } from "@/components/form";
import { useGetCurrentUser } from "@/hooks/queries";

const Page = async () => {
  const user = await useGetCurrentUser();

  return (
    <div className="p-2 grid grid-cols-1 gap-4">
      <UserSettingsForm
        defaultValues={{
          id: String(user.id),
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        }}
      />
      <hr />
      <UserExpenseSettingsForm />
    </div>
  );
};

export default Page;
