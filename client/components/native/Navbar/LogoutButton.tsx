"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/actions/auth";

const LogoutButton = () => {
  const router = useRouter();
  const logout = async () => {
    await logoutAction().then(() => {
      router.replace("/auth/login");
    });
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default LogoutButton;
