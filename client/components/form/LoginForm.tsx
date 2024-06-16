"use client";

import { loginFormAction } from "@/actions/auth";
import { useLoginForm } from "@/hooks/form/useLoginForm";
import { useRouter } from "next/navigation";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export const LoginForm = () => {
  const form = useLoginForm();
  const router = useRouter();
  const { toast } = useToast();

  return (
    <form
      action={(formVal) => {
        loginFormAction(formVal).then((res) => {
          if (res) {
            toast({
              title: "Error",
              description: String(res.data),
            });
          }
        });
      }}
    >
      <div className="flex flex-col gap-[1rem]">
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="mx-auto">
          <Button
            type="button"
            onClick={() => {
              router.push("/auth/register");
            }}
            variant="link"
          >
            New user? Register here
          </Button>
        </div>
      </div>
    </form>
  );
};
