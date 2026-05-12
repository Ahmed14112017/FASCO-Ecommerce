"use client";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { ForgetPassword } from "@/lib/api/auth";
import { Forgetpassword, Forgetpasswordschema } from "@/lib/schema/auth.schema";
import { ForgetPassworddataProps } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Forgetpaswordform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Forgetpassword>({
    resolver: zodResolver(Forgetpasswordschema),
  });
  const router = useRouter();
  const Forgetsubmit = async (data: Forgetpassword) => {
    try {
      const resonse = await ForgetPassword(data);
      console.log(resonse);
      toast.success(resonse.message || "Check Ypur Email");
      router.push("/reset-password");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Something went wrong");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(Forgetsubmit)}>
        <Input
          type="email"
          placeholder="Enter Your Email"
          {...register("email")}
          className="w-full outline-none border-b border-gray-400 p-3"
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
        <Button
          className="p-3 rounded-md w-full mt-5"
          variant="primary"
          type="submit"
        >
          Send Confirmation Code
        </Button>
      </form>
      <div className="flex justify-center p-6">
        <span className="">
          Already have an account?{" "}
          <Link className="text-textblue" href={"/login"}>
            Login
          </Link>
        </span>
      </div>
    </>
  );
}
