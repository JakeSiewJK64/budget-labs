import { RegisterForm } from "@/components/form";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

const Page = () => {
  return (
    <div className="flex grow">
      <Card className="w-[50%] mx-auto mt-[15%] max-w-[30rem] p-[1rem]">
        <CardTitle className="text-center py-[10px]">Register</CardTitle>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
