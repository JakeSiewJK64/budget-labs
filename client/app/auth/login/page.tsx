import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/form";

const Page = () => {
  return (
    <div className="flex grow">
      <Card className="w-[50%] mx-auto mt-[15%] mb-[20%] max-w-[30rem] p-[1rem]">
        <CardTitle className="text-center py-[10px]">Login</CardTitle>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
