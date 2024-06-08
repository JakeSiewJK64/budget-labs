import Navbar from "@/components/native/Navbar";

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <>{children}</>
    </>
  );
};

export default ProtectedLayout;
