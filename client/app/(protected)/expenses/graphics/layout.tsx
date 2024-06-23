import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Expenses",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default Layout;
