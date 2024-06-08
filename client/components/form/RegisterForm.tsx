"use client"

import { useRouter } from "next/navigation";
import { z } from "zod";
import { registerFormAction } from "@/actions/auth";
import {
  useRegisterForm,
  registerFormSchema,
} from "@/hooks/form/useRegisterForm";
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

export const RegisterForm = () => {
  const form = useRegisterForm();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const res = await registerFormAction(values);

    if (res === 200) {
      router.push("/dashboard");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[1rem]">
        <Form {...form}>
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="Firstname" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="Lastname" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input type="password" placeholder="Password" {...field} />
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
          Register
        </Button>
        <div className="mx-auto">
          <Button
            type="button"
            onClick={() => {
              router.push("/auth/login");
            }}
            variant="link"
          >
            Already have an account? Login here
          </Button>
        </div>
      </div>
    </form>
  );
};
