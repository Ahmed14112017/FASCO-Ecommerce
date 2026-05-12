"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "../../ui/Button";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { decodedtoken } from "@/types/auth";

interface NavItem {
  name: string;
  href: string;
}
export default function Navbar() {
  const token = cookies.get("token");

  let decoded: decodedtoken | null = null;

  if (token) {
    decoded = jwtDecode<decodedtoken>(token);
  }

  console.log(decoded);
  const [openmenu, setopenmenu] = useState(false);
  const navbar: NavItem[] = [
    {
      name: "Home",
      href: "#home",
    },
    { name: "Deals", href: "#deals" },
    { name: "New Arrivals", href: "#New-Arrivals" },
    { name: "Packages", href: "#Packages" },
  ];
  return (
    <header className="py-3 px-6 sticky z-50 top-0 bg-white border-b border-gray-100">
      <nav className="flex justify-between  items-center ">
        <Link className="text-xl text-gray-600" href={"/"}>
          FASCO
        </Link>

        <ul className="hidden md:flex md:ml-auto items-center gap-5">
          {navbar.map((nav) => {
            return (
              <li key={nav.name}>
                <Link
                  className="hover:text-gray-900 transition-colors"
                  href={`#${nav.href}`}
                >
                  {nav.name}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* Desktop buttons */}

        <div className="hidden md:flex gap-3 ">
          <Link
            className="py-3 px-6 rounded-md bg-gray-100 text-black hover:bg-gray-200"
            href={"/register"}
          >
            Sign up
          </Link>
          <Link
            className="py-3 px-6 rounded-md bg-black text-white hover:opacity-80"
            href={"/login"}
          >
            Sign in
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setopenmenu(!openmenu)}
        >
          <div className="relative w-5 h-5">
            <span
              className={`absolute inset-0 transition-all duration-300 ${openmenu ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
            >
              <X size={20} />
            </span>
            <span
              className={`absolute inset-0 transition-all duration-300 ${openmenu ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
            >
              <Menu size={20} />
            </span>
          </div>
        </button>
      </nav>
      {/* Mobile menu */}

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${openmenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6  py-3 flex flex-col gap-4 bg-gray-400 border-t border-gray-100">
          <ul className="flex flex-col gap-3">
            {navbar.map((nav) => {
              return (
                <li key={nav.name}>
                  <Link
                    className="block py-2 hover:text-gray-900 hover:bg-white rounded-md px-3 transition-all duration-200"
                    href={`${nav.href}`}
                    onClick={() => setopenmenu(false)}
                  >
                    {nav.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            className="py-2 px-5 rounded-md bg-gray-100 text-black text-center"
            href="/register"
          >
            Sign up
          </Link>
          <Link
            className="py-2 px-5 rounded-md bg-black text-white text-center"
            href="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
