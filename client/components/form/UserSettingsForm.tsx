"use client";

import { useUserSettingsForm } from "@/hooks/form";
import { DefaultUserValues } from "@/hooks/form/useUserSettingsForm";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { updateUserDetailsSettings } from "@/actions/settings";
import { useToast } from "../ui/use-toast";

export const UserSettingsForm = ({
  defaultValues,
}: {
  defaultValues: DefaultUserValues;
}) => {
  const form = useUserSettingsForm({ defaultValues });
  const { toast } = useToast();

  return (
    <form
      onSubmit={form.handleSubmit((e) => {
        updateUserDetailsSettings({ ...e, id: defaultValues.id })
          .then(() => {
            toast({
              title: "Success",
              description: "Successfully updated user details.",
            });
          })
          .catch((err) => {
            toast({
              title: "Error",
              description: err,
            });
          });
      })}
      className="flex flex-col gap-2"
    >
      <h2 className="text-2xl font-extrabold">User Settings</h2>
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
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
      <div className="ml-auto">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
