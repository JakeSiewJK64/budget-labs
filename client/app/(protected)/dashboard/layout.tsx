import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="m-3">
      <h1 className="font-bold lg:text-3xl">
        Dashboard
      </h1>
      <>{children}</>
    </div>
  );
};

export default layout;
