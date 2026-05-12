"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Button from "../Button";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const logout = () => {
    cookies.remove("token");
    setOpen(false);
    router.replace("/login");
  };
  useEffect(() => {
    const clickoutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", clickoutside);
    return () => document.removeEventListener("mousedown", clickoutside);
  }, []);

  return (
    <div ref={ref} className=" relative inline-block ">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center text-black bg-gray-200 hover:bg-gray-300 rounded-md text-sm px-4 py-2.5"
      >
        <Image
          src="/images/image-avatar.png"
          alt="avatar"
          width={45}
          height={45}
          className="rounded-full object-cover border cursor-pointer"
        />
      </button>

      {open && (
        <div className="absolute mt-2 z-10 right-0 bg-white border rounded-md shadow-lg w-44 ">
          <ul className="p-2 text-sm">
            <li>
              <Link href="#" className="block p-2 hover:bg-gray-100 rounded">
                Dashboard
              </Link>
            </li>

            <li>
              <Link href="#" className="block p-2 hover:bg-gray-100 rounded">
                Settings
              </Link>
            </li>

            <li>
              <Link href="#" className="block p-2 hover:bg-gray-100 rounded">
                Earnings
              </Link>
            </li>

            <li>
              <Button
                className="block p-2  rounded "
                variant="primary"
                onClick={logout}
              >
                Sign out
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
