import { SettingsNavbarComponent } from "@/components/native/Navbar/SettingsNavbarComponent";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Settings",
};

const routes = [
  { path: "/settings/user-details", label: "User Details" },
  { path: "/settings/expense", label: "Expense" },
];

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SettingsNavbarComponent routes={routes} />
      <div className="p-2 grid grid-cols-1 gap-4">{children}</div>
    </>
  );
};

export default layout;
