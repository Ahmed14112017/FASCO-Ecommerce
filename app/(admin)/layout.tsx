import { ReactNode } from "react";
import AdminNavbar from "../components/layout/AdminNavbar/AdminNavbar";
import Sidbar from "../components/layout/Sidbar/Sidbar";

export default function Adminlayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex ">
      <Sidbar />
      <div className="flex flex-1 flex-col w-full">
        <AdminNavbar />
        {children}
      </div>
    </div>
  );
}
