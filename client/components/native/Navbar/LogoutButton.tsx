"use server";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const LogoutButton = async () => {
  return (
    <Link className={buttonVariants()} href="/logout" target="_top">
      Logout
    </Link>
  );
};

export default LogoutButton;
