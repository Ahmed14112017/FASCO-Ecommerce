"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "../../ui/Button";
import { Menu, X, ShoppingCart, Search, Heart } from "lucide-react";
import cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { decodedtoken } from "@/features/auth/types/auth";
import { useRouter } from "next/navigation";
import MiniCart from "../MiniCart";
import { useAppSelector } from "@/lib/hooks/Hooks";

interface NavItem {
  name: string;
  href: string;
}

const guestNav: NavItem[] = [
  { name: "Home", href: "/#home" },
  { name: "Deals", href: "/#deals" },
  { name: "New Arrivals", href: "/#new-arrivals" },
  { name: "Packages", href: "/#packages" },
];

const userNav: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Orders", href: "/orders" },
  { name: "Profile", href: "/profile" },
];

function NavLink({
  nav,
  className,
  onClick,
}: {
  nav: NavItem;
  className?: string;
  onClick?: () => void;
}) {
  if (nav.href.startsWith("/#")) {
    return (
      <a href={nav.href} onClick={onClick} className={className}>
        {nav.name}
      </a>
    );
  }
  return (
    <Link href={nav.href} onClick={onClick} className={className}>
      {nav.name}
    </Link>
  );
}

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openmenu, setopenmenu] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity ?? 1),
    0,
  );

  const token = cookies.get("token");
  const router = useRouter();

  let decoded: decodedtoken | null = null;
  if (token) {
    decoded = jwtDecode<decodedtoken>(token);
  }

  const isUser = decoded?.role === "user";
  const navbar = isUser ? userNav : guestNav;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${searchQuery}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  }

  return (
    <header className="py-3 px-6 sticky z-50 top-0 bg-white border-b border-gray-100">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link className="text-xl text-gray-600" href="/">
          FASCO
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex md:ml-auto items-center gap-5">
          {navbar.map((nav) => (
            <li key={nav.name}>
              <NavLink
                nav={nav}
                className="hover:text-gray-900 transition-colors"
              />
            </li>
          ))}
        </ul>

        {/* Wishlist */}
        {isUser && (
          <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-lg">
            <Heart size={20} />
          </Link>
        )}

        {/* Search */}
        {isUser && (
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Search size={20} />
            </button>
            {showSearch && (
              <form
                onSubmit={handleSearch}
                className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 flex gap-2 w-72"
              >
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-black text-white rounded-lg text-sm"
                >
                  Go
                </button>
              </form>
            )}
          </div>
        )}

        {/* Cart */}
        {isUser && (
          <div className="relative">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {showCart && <MiniCart onClose={() => setShowCart(false)} />}
          </div>
        )}

        {/* Desktop auth buttons */}
        {!token ? (
          <div className="hidden md:flex gap-3">
            <Link
              className="py-3 px-6 rounded-md bg-gray-100 text-black hover:bg-gray-200"
              href="/register"
            >
              Sign up
            </Link>
            <Link
              className="py-3 px-6 rounded-md bg-black text-white hover:opacity-80"
              href="/login"
            >
              Sign in
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex gap-3">
            <Button
              variant="primary"
              className="py-2 px-5 rounded-md"
              onClick={() => {
                cookies.remove("token");
                router.push("/login");
              }}
            >
              Log out
            </Button>
          </div>
        )}

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setopenmenu(!openmenu)}
        >
          <div className="relative w-5 h-5">
            <span
              className={`absolute inset-0 transition-all duration-300 ${
                openmenu ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
              }`}
            >
              <X size={20} />
            </span>
            <span
              className={`absolute inset-0 transition-all duration-300 ${
                openmenu ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
              }`}
            >
              <Menu size={20} />
            </span>
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          openmenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-3 flex flex-col gap-4 bg-gray-400 border-t border-gray-100">
          <ul className="flex flex-col gap-3">
            {navbar.map((nav) => (
              <li key={nav.name}>
                <NavLink
                  nav={nav}
                  className="block py-2 hover:text-gray-900 hover:bg-white rounded-md px-3 transition-all duration-200"
                  onClick={() => setopenmenu(false)}
                />
              </li>
            ))}
          </ul>
        </div>

        {!token ? (
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
        ) : (
          <div className="flex flex-col gap-3">
            <button
              className="py-2 px-5 rounded-md bg-gray-100 text-black text-center"
              onClick={() => {
                cookies.remove("token");
                router.push("/login");
                setopenmenu(false);
              }}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
