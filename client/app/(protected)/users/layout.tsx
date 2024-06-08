import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="m-3">
      <div>users layout</div>
      {children}
    </div>
  );
};

export default layout;
