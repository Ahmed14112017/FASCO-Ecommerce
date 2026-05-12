import Image from "next/image";
import Forgetpaswordform from "./forgetpaswordform";

export default function Forgetpassword() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen ">
      <div className="relative">
        <Image
          src={"/images/Forgetpassword.jpg"}
          alt="forgetpassword"
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col justify-between px-12 py-10 ">
        <span className="text-2xl font-bold text-[#484848]">FASCO</span>
        <div className=" flex flex-col gap-6">
          <p className="text-xl">Forget Password</p>
          <Forgetpaswordform />
        </div>
        <div></div>
      </div>
    </div>
  );
}
