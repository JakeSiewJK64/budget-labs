import { Navbar, SideMenu } from "@/components/native";
import { Toaster } from "@/components/ui/toaster";

const routes = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/users", label: "Users" },
];

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Toaster />
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-row gap-2 sm:grid grid-cols-1">
          <div className="max-w-[100%]">
            <SideMenu routes={routes} />
          </div>
          <div className="border rounded-sm ml-1 md:w-[35rem] lg:w-[65rem]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedLayout;
