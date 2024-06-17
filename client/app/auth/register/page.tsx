import { RegisterForm } from "@/components/form";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const paddingTop = "min-[1200px]:pt-[3%] max-[1200px]:pt-[30%]";

const Page = () => {
  return (
    <div className={cn(`flex justify-center items-baseline ${paddingTop}`)}>
      <Card className="w-[50%] max-w-[30rem] p-[1rem]">
        <CardTitle className="text-center py-[10px]">Register</CardTitle>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
