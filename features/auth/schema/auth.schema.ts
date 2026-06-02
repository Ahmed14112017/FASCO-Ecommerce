import { z } from "zod";

export const loginschema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerschema = z
  .object({
    name: z.string().min(6, "name must be at least 6 characters"),
    email: z.email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const Forgetpasswordschema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
});
export const ResetPasswordschema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type LoginForm = z.infer<typeof loginschema>;
export type RegisterForm = z.infer<typeof registerschema>;
export type Forgetpassword = z.infer<typeof Forgetpasswordschema>;
export type ResetPassword = z.infer<typeof ResetPasswordschema>;
