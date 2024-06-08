import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
};

export default layout;
