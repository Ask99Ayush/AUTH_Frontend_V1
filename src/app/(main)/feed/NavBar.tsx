"use client";

import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Matching login page */}
          <div className="flex items-center">
            <Link href="/feed" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CF</span>
              </div>
              <span className="text-lg font-bold text-white">
                Tine<span className="text-primary">Flow</span>
              </span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-red-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user?.name?.charAt(0) || "U"}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-300">
                {user?.name || "User"}
              </span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-all border border-white/10"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}