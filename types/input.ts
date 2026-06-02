import { LogindataProps } from "../features/auth/types/auth";

export interface IputLogin {
  type: string;
  name: keyof LogindataProps;
  placeholder: string;
}
