"use server";

import { getIsTokenExpired } from "@/actions/auth";
import { Toaster } from "@/components/ui/toaster";
import { getCookie } from "@/utils/cookiesUtils";
import { redirect } from "next/navigation";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authToken = getCookie("token");
  const tokenExpired = await getIsTokenExpired(authToken?.value);
  const authenticated = authToken && !tokenExpired;

  if (authenticated) {
    redirect("/dashboard");
  }

  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default Layout;
