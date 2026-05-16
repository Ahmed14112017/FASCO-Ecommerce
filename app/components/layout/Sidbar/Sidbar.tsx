"use client";
import {
  ChartColumnStacked,
  LayoutDashboard,
  Logs,
  PanelRightClose,
  PanelRightOpen,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
interface itemProps {
  name: string;
  href: string;
  icon: ReactNode;
}
const itemSidebar: itemProps[] = [
  {
    name: "dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "products",
    href: "/Adminproducts",
    icon: <ShoppingBasket />,
  },
  {
    name: "categories",
    href: "/categories",
    icon: <ChartColumnStacked />,
  },
  {
    name: "orders",
    href: "/Adminorders",
    icon: <Logs />,
  },
];
export default function Sidebar() {
  const [open, setopen] = useState(true);
  return (
    <div
      className={`min-h-screen bg-gray-200 ${open ? "w-60" : "w-20"} transition-all duration-200  ease-in-out flex flex-col  items-center`}
    >
      <div className=" w-full text-center ">
        <button
          className="border-b-2 border-gray-300 w-full flex justify-center  py-8"
          onClick={() => setopen(!open)}
        >
          {open ? <PanelRightOpen /> : <PanelRightClose />}
        </button>
      </div>

      <ul className=" px-3 mt-6 space-y-2">
        {itemSidebar.map((item) => {
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className=" rounded-md px-4 py-3 hover:bg-gray-300 transition-colors flex gap-4"
              >
                {" "}
                {item.icon}
                {open && <span>{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
