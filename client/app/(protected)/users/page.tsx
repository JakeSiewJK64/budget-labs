import { useGetAllUsers } from "@/hooks";

export default async function Page() {
  const { data: users } = await useGetAllUsers();

  if (!users) {
    return "No Users at the moment...";
  }

  if (users) {
    return (
      <>
        {users.content.map((user: User) => (
          <div key={user.id}>
            <p>{user.first_name}</p>
          </div>
        ))}
      </>
    );
  }

  return null;
}
