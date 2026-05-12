import { LogindataProps } from "./auth";

export interface IputLogin {
  type: string;
  name: keyof LogindataProps;
  placeholder: string;
}
