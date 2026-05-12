"use client";
import Link from "next/link";
import Dropdown from "../../ui/Dropdown/Dropdown";
import { jwtDecode } from "jwt-decode";
import cookies from "js-cookie";
import { decodedtoken } from "@/types/auth";

export default function AdminNavbar() {
  const token = cookies.get("token");

  let decoded: decodedtoken | null = null;

  if (token) {
    decoded = jwtDecode<decodedtoken>(token);
  }
  return (
    <div>
      <header className="py-3 px-6 sticky z-50 top-0 bg-white border-b border-gray-100">
        <nav className="flex justify-between  items-center ">
          <Link className="text-xl text-gray-600" href={"/"}>
            FASCO
          </Link>
          <div className="flex items-center gap-3 ">
            <div className="flex flex-col">
              <span>{decoded?.email}</span>
              <span>{decoded?.name}</span>
            </div>
            <Dropdown />
          </div>
        </nav>
      </header>
    </div>
  );
}
