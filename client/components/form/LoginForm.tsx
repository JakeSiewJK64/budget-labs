"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { loginFormAction } from "@/actions/auth";
import { useLoginForm, loginFormSchema } from "@/hooks/form/useLoginForm";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";

export const LoginForm = () => {
  const form = useLoginForm();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const res = await loginFormAction(values);

    if (res === 200) {
      router.push("/dashboard");
    } else {
      form.setError("password", {
        message: "Either email or password is incorrect.",
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
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
