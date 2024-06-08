import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().min(1, {
    message: "Email cannot be empty.",
  }),
  password: z.string().min(8, {
    message: "Password must contain 8 characters.",
  }),
});

const useLoginForm = () => {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return loginForm;
};


export {useLoginForm, loginFormSchema}