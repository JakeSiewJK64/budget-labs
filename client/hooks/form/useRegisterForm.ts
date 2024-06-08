import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
  email: z.string().min(1, {
    message: "Email cannot be empty.",
  }),
  password: z.string().min(8, {
    message: "Password must contain 8 characters.",
  }),
  firstname: z.string().min(1, {
    message: "First name cannot be empty.",
  }),
  lastname: z.string().min(1, {
    message: "Last name cannot be empty.",
  }),
});

const useRegisterForm = () => {
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  return registerForm;
};

export { useRegisterForm, registerFormSchema };
