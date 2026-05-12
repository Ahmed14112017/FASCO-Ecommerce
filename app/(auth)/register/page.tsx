import Image from "next/image";
import Registerform from "./registerform";

export default function Register() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen gap-8 px-4">
      <div className="hidden md:block relative">
        <Image
          src={"/images/signup-1.jpg"}
          alt="signup"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between min-h-screen px-12 py-10 bg-white">
        <span className="text-3xl font-semibold tracking-widest uppercase text-gray-900">
          FASCO
        </span>
        <Registerform />
      </div>
    </div>
  );
}
