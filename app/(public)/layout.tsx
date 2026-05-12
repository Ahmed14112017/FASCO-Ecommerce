import { ReactNode } from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/footer/Footer";

export default function Publiclayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
