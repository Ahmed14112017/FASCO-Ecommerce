import { ReactNode } from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import AdminNavbar from "../components/layout/AdminNavbar/AdminNavbar";

export default function Adminlayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  );
}
