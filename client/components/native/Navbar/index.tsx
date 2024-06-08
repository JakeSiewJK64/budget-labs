import { Card } from "@/components/ui/card";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <Card className="rounded-sm p-3 m-2 flex">
      <a className="my-auto" href="/dashboard">
        My Application
      </a>
      <div className="ml-auto">
        <a href="/users" className="mr-5">
          Users
        </a>
        <LogoutButton />
      </div>
    </Card>
  );
};

export default Navbar;
