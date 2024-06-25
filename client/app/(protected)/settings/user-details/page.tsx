import { UserSettingsForm } from "@/components/form";
import { useGetCurrentUser } from "@/hooks/queries";

const Page = async () => {
  const user = await useGetCurrentUser();
  return (
    <UserSettingsForm
      defaultValues={{
        id: String(user.id),
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      }}
    />
  );
};

export default Page;
