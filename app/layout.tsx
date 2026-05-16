import type { Metadata } from "next";
import "./globals.css";
import { Volkhov } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "FASCO Ecommerce",
  description: "Buy best products online at best prices",
  keywords: ["ecommerce", "shop", "online store"],
  authors: [{ name: "Ahmed Arafa" }],
};
const volkhov = Volkhov({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-full flex flex-col  ${volkhov.className}`}>
        <GoogleOAuthProvider clientId={process.env.CLIENT_ID!}>
          <ReactQueryProvider>{children}</ReactQueryProvider>

          <ToastContainer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
