import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
};

export default layout;
