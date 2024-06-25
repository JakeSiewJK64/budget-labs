"use client";

import { Form } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const UserExpenseSettingsForm = () => {
  return (
    <form action="">
      <h2 className="text-2xl font-extrabold">User Expense Settings</h2>
      <Input placeholder="Monthly Income" type="number" />
    </form>
  );
};
