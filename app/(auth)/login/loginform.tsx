"use client";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { googlelogin, login } from "@/lib/api/auth";
import { ChangeEvent, useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { LogindataProps } from "@/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, loginschema } from "@/lib/schema/auth.schema";
import { IputLogin } from "@/types/input";

export default function Loginform() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginschema),
  });
  const [showpassword, Setshowpassword] = useState(false);
  const [loading, setloading] = useState<boolean>(false);

  const toggleshowingpassword = () => {
    Setshowpassword(!showpassword);
  };
  const input: IputLogin[] = [
    { name: "email", type: "email", placeholder: "email" },
    { name: "password", type: "password", placeholder: "password" },
  ];
  const router = useRouter();

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
  const handelsubmitlogindata = async (data: LoginForm) => {
    setloading(true);
    try {
      const res = await login(data);
      console.log(res.user);
      toast.success(res.message || "login is success");
      if (res.user.role === "admin") {
        router.push("/Adminproducts");
      } else {
        router.push("/products");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message);
    } finally {
      setloading(false);
    }
  };

  const handleGoogle = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await googlelogin(credentialResponse);
      toast.success("Wellcome");

      router.push(res.role === "admin" ? "/Adminproducts" : "/products");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Google login failed",
      );
    }
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
  return (
    <>
      <div className="flex flex-col gap-7 w-full  mx-auto">
        <h1 className="text-2xl font-light text-gray-900">Sign In To FASCO</h1>
        <div className="grid grid-cols-2 gap-3">
          <GoogleLogin
            onSuccess={handleGoogle}
            onError={() => toast.error("Google login failed")}
          />
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-gray-400 transition-colors"
          >
            <GmailIcon />
            Sign up with Email
          </button>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="w-14 border h-px bg-gray-200 border-gray-500"></div>
          <span className="text-2xl text-gray-400 uppercase">or</span>
          <div className="w-14 border h-px bg-gray-200 border-gray-500"></div>
        </div>
        <form
          onSubmit={handleSubmit(handelsubmitlogindata)}
          className="flex flex-col gap-4"
        >
          {input.map((input, index) => {
            return (
              <div key={index} className="mb-3">
                <Input
                  type={input.type}
                  placeholder={input.placeholder}
                  className="  w-full pt-5 pb-1 px-4 bg-transparent  border-b border-gray-200 focus:border-gray-900 outline-none"
                  {...register(input.name)}
                />
                {errors[input.name] && (
                  <span className="text-xs text-red-500">
                    {" "}
                    {errors[input.name]?.message}
                  </span>
                )}
              </div>
            );
          })}

          <div className="flex flex-col gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white text-sm font-medium tracking-widest uppercase rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/register")}
              className="w-full py-4 bg-transparent text-indigo-500 text-sm font-medium border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Register Now
            </button>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => router.push("/forget-password")}
                className="text-sm text-indigo-500 hover:underline"
              >
                Forget Password?
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
