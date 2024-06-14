import { useGetAllUsers } from "@/hooks/queries";

export default async function Page() {
  const users = await useGetAllUsers();

  if (!users) {
    return "No Users at the moment...";
  }

  if (users) {
    return (
      <>
        {users.content.map((user) => (
          <div key={user.id}>
            <p>{user.email}</p>
          </div>
        ))}
      </>
    );
  }

  return null;
}
