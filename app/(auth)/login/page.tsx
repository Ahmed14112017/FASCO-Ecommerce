import Image from "next/image";
import Loginform from "./loginform";
export default function Login() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="hidden md:block relative">
        <Image
          src={"/images/loginimage-1.jpg"}
          alt="loginimage"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between min-h-screen px-12 py-10 bg-white ">
        <span className="text-3xl font-semibold tracking-widest uppercase text-gray-900">
          FASCO
        </span>

        <Loginform />
      </div>
    </div>
  );
}
