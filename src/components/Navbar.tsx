"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const { token, logout } = useAuth(); // ✅ logout now exists in AuthCtx
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CF</span>
            </div>
            <Link
              href="/"
              className="text-2xl font-bold font-netflix tracking-wider text-white hover:text-primary transition-colors"
            >
              Cine<span className="text-primary">Flow</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/feed"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                pathname === "/feed"
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Feed
            </Link>

            {token ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-300 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-lg"
                >
                  Profile
                </Link>
                <button
                  onClick={logout} // ✅ fixed TypeScript error
                  className="px-6 py-2 bg-gradient-to-r from-primary to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                    pathname === "/login"
                      ? "bg-gradient-to-r from-primary to-red-700 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5 border border-white/10"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
