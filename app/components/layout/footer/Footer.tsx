import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xl font-semibold tracking-widest text-gray-900">
          FASCO
        </span>

        <nav className="flex items-center gap-6 flex-wrap justify-center">
          {[
            { label: "Support Center", href: "#" },
            { label: "Invoicing", href: "#" },
            { label: "Contract", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Blog", href: "#" },
            { label: "FAQs", href: "#" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-100 py-4 text-center">
        <p className="text-xs text-gray-400">
          Copyright © 2025 Fasco. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
