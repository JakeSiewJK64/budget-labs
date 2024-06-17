"use server";

import { Toaster } from "@/components/ui/toaster";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default Layout;
