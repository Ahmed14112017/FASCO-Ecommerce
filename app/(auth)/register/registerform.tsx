"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm, registerschema } from "@/lib/schema/auth.schema";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { googlelogin, registeraccount } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { AxiosError } from "axios";
export default function Registerform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerschema),
  });
  const [loading, setloading] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleshowpassword = () => {
    setshowpassword(!showpassword);
  };
  const toggleshowconfirmpassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  function GmailIcon() {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
        />
      </svg>
    );
  }
  function EyeIcon() {
    return (
      <svg
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  function EyeOffIcon() {
    return (
      <svg
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    );
  }
  const router = useRouter();
  const handelgoogle = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await googlelogin(credentialResponse);
      console.log(res);
      toast.success("register is right");
      router.push("/login");
    } catch (error) {}
  };

  const handelregister = async (data: RegisterForm) => {
    setloading(true);
    try {
      const res = await registeraccount(data);
      console.log(res);
      toast.success("it is ok");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message);
    }
  };
  return (
    <div className="flex flex-col w-full mx-auto">
      <h1 className="text-2xl font-light pb-10 text-gray-900 py-3">
        Create Account
      </h1>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3  rounded-lg text-sm "
        >
          <GoogleLogin
            text="signup_with"
            onSuccess={handelgoogle}
            onError={() => toast.error("Google login failed")}
          />
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3  rounded-lg text-sm "
        >
          <GmailIcon />
          Sign up with Email
        </button>
      </div>
      <div className="flex items-center justify-center gap-3 py-4 pb-10">
        <div className="w-14 border h-px bg-gray-200 border-gray-500"></div>
        <span className="text-2xl text-gray-400 uppercase">or</span>
        <div className="w-14 border h-px bg-gray-200 border-gray-500"></div>
      </div>
      <form onSubmit={handleSubmit(handelregister)}>
        <div className="flex justify-between gap-4 mb-4 pb-10">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              className="outline-none border-b border-gary-200 focus:border-gary-900 w-full p-3 "
              placeholder="username"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
            <input
              type="email"
              className="outline-none border-b border-gary-200 focus:border-gary-900 w-full p-3"
              placeholder="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex justify-between items-center gap-3">
              <input
                type={showpassword ? "text" : "password"}
                className="outline-none border-b border-gary-200 focus:border-gary-900 w-full p-3 flex-1"
                placeholder="password"
                {...register("password")}
              />

              <Button variant="secondary" onClick={() => toggleshowpassword()}>
                {showpassword ? EyeIcon() : EyeOffIcon()}
              </Button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
            <div className="flex  justify-between items-center gap-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="outline-none border-b border-gary-200 focus:border-gary-900 w-full p-3"
                placeholder="Confirm password"
                {...register("confirmPassword")}
              />

              <Button
                variant="secondary"
                type="button"
                onClick={() => toggleshowconfirmpassword()}
              >
                {showConfirmPassword ? EyeIcon() : EyeOffIcon()}
              </Button>
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center p-6">
          <Button
            type="submit"
            variant="primary"
            className="p-3 rounded-md w-full"
          >
            {loading ? "Loading..." : "Create Account"}
          </Button>
        </div>
        <div className="flex justify-center p-6">
          <span className="">
            Already have an account?{" "}
            <Link className="text-textblue" href={"/login"}>
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
