import Resetpasswordform from "./Resetpasswordform";
import Image from "next/image";

export default function Resetpassword() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen ">
      <div className="relative">
        <Image
          src={"/images/resetpassword.jpg"}
          alt="forgetpassword"
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col justify-between px-12 py-10 ">
        <span className="text-2xl font-bold text-[#484848]">FASCO</span>
        <div className=" flex flex-col gap-6">
          <p className="text-xl">Reset Password</p>
          <Resetpasswordform />
        </div>
        <div></div>
      </div>
    </div>
  );
}
