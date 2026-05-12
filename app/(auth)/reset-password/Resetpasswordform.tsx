"use client";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import api from "@/lib/axios";
import { ResetPassword, ResetPasswordschema } from "@/lib/schema/auth.schema";
import { ResetPassworddataProps } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useState } from "react";

export default function Resetpasswordform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: zodResolver(ResetPasswordschema),
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const token = searchParams.get("token");
  const handelResetSubmit = async (data: ResetPassword) => {
    const { confirmPassword, ...rest } = data;

    setloading(true);
    try {
      const res = await api.post("/auth/reset-password", {
        ...rest,
        token,
      });
      const response = res.data;

      console.log(response);
      toast.success(response.message || "Password is changed successfully");
      router.push("/login");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(handelResetSubmit)}>
      <Input
        type="password"
        placeholder="Type New Password"
        className="border-b border-gray-400 outline-none p-3 w-full"
        {...register("password")}
      />
      {errors.password && (
        <span className="text-xs text-red-500">{errors.password.message}</span>
      )}
      <Input
        type="password"
        placeholder="Confirm New Password"
        className="border-b border-gray-400 outline-none p-3 w-full"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <span className="text-xs text-red-500">
          {errors.confirmPassword.message}
        </span>
      )}
      <Button
        className="p-3 w-full mt-8 rounded-md cursor-pointer"
        variant="primary"
        type="submit"
      >
        Reset New Password
      </Button>
    </form>
  );
}
