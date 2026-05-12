import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { decodedtoken } from "./types/auth";

export default function proxy(req: NextRequest) {
  //   const token = req.cookies.get("token")?.value;
  //   const { pathname } = req.nextUrl;
  //   if (token && (pathname === "/login" || pathname === "/register")) {
  //     const decoded = jwtDecode<decodedtoken>(token);
  //     if (decoded.role === "admin") {
  //       return NextResponse.redirect(new URL("/Adminproducts", req.url));
  //     }
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  //   if (token && pathname.startsWith("/Adminproducts")) {
  //     const decoded = jwtDecode<decodedtoken>(token);
  //     if (decoded.role !== "admin") {
  //       return NextResponse.redirect(new URL("/", req.url));
  //     }
  //   }
  //   if ((!token && pathname.startsWith("/Adminproducts")) || pathname === "/") {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  //   return NextResponse.next();
  // }
  // export const config = {
  //   matcher: ["/Adminproducts/:path*", "/login", "/register", "/"],
}
