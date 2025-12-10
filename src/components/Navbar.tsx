"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { token, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();        // clear token/session via AuthContext
    router.push("/"); // redirect to homepage
    setOpenMenu(false); // close mobile menu if open
  };

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        pathname === href
          ? "bg-primary/20 text-primary border border-primary/30"
          : "text-gray-300 hover:text-white hover:bg-white/5"
      }`}
      onClick={() => setOpenMenu(false)}
    >
      {label}
    </Link>
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">TF</span>
            </div>

            <Link
              href="/"
              className="text-2xl font-bold font-netflix tracking-wider text-white hover:text-primary transition-colors"
            >
              Tine<span className="text-primary">Flow</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLink("/feed", "Feed")}

            {token ? (
              <>
                {navLink("/profile", "Profile")}
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-red-700 text-white rounded-lg font-medium 
                  hover:from-red-700 hover:to-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {navLink("/login", "Login")}
                <Link
                  href="/register"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium 
                  hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setOpenMenu(true)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {openMenu && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden">
          <div className="bg-[#0f0f0f] w-64 h-full p-6 shadow-xl animate-slide-right">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setOpenMenu(false)}
                className="text-gray-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              {navLink("/feed", "Feed")}

              {token ? (
                <>
                  {navLink("/profile", "Profile")}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-red-700 text-white rounded-lg font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {navLink("/login", "Login")}
                  {navLink("/register", "Register")}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}