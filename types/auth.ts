export interface decodedtoken {
  name: string;
  email: string;
  role: string;
}
export interface LogindataProps {
  email: string;
  password: string;
}
export interface RegisterdataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgetPassworddataProps {
  email: string;
}
export interface ResetPassworddataProps {
  password: string;
  confirmPassword: string;
}
