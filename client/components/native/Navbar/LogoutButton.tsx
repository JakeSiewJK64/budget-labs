import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const LogoutButton = () => {
  return (
    <Link className={buttonVariants()} href="/logout">
      Logout
    </Link>
  );
};

export default LogoutButton;
