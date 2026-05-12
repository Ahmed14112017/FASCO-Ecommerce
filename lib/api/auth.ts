import { CredentialResponse } from "@react-oauth/google";
import api from "../axios";
import Cookies from "js-cookie";
import {
  decodedtoken,
  ForgetPassworddataProps,
  LogindataProps,
  RegisterdataProps,
} from "@/types/auth";
import { jwtDecode } from "jwt-decode";

export const login = async (data: LogindataProps) => {
  const res = await api.post("/auth/login", data);
  Cookies.set("token", res.data.token, { expires: 7 });
  const decoded = jwtDecode<decodedtoken>(res.data.token);
  console.log(res);
  return { ...res.data, role: decoded.role };
};

export const registeraccount = async (data: RegisterdataProps) => {
  const { confirmPassword, ...rest } = data;
  const res = await api.post("auth/register", rest);
  return res.data;
};
export const googlelogin = async (CredentialResponse: CredentialResponse) => {
  const idToken = CredentialResponse.credential;
  if (!idToken) {
    throw new Error("this is wrong");
  }

  const res = await api.post("/auth/google", { idToken });
  Cookies.set("token", res.data.token, { expires: 7 });
  const decoded = jwtDecode<decodedtoken>(res.data.token);
  console.log(res);
  return { ...res.data, role: decoded.role };
};

export const ForgetPassword = async (data: ForgetPassworddataProps) => {
  const res = await api.post("/auth/forgot-password", data);
  return res.data;
};
