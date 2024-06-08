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
      <div>dashboard layout</div>
      {children}
    </div>
  );
};

export default layout;
