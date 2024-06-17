import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/form";
import { cn } from "@/lib/utils";

const paddingTop = "min-[1200px]:pt-[10%] max-[1200px]:pt-[45%]";

const Page = () => {
  return (
    <div className={cn(`flex justify-center items-baseline ${paddingTop}`)}>
      <Card className="w-[50%] max-w-[30rem] p-[1rem]">
        <CardTitle className="text-center py-[10px]">Login</CardTitle>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
