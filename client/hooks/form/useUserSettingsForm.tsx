import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userSettingsFormSchema = z.object({
  email: z.string().min(1, {
    message: "Email cannot be empty.",
  }),
  first_name: z.string().min(1, {
    message: "First name cannot be empty.",
  }),
  last_name: z.string().min(1, {
    message: "Last name cannot be empty.",
  }),
});

export type DefaultUserValues = z.infer<typeof userSettingsFormSchema> & {
  id: string;
};

const useUserSettingsForm = ({
  defaultValues,
}: {
  defaultValues: DefaultUserValues;
}) => {
  return useForm<z.infer<typeof userSettingsFormSchema>>({
    resolver: zodResolver(userSettingsFormSchema),
    defaultValues,
  });
};

export { useUserSettingsForm, userSettingsFormSchema };
