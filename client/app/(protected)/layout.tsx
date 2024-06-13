import { Navbar, SideMenu } from "@/components/native";

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
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-row gap-2">
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
