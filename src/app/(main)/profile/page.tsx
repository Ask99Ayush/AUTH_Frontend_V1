"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { token, logout } = useAuth();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const savedUser = localStorage.getItem("tf_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [token]);

  const handleLogout = () => {
    logout(); // Use the logout function from AuthContext
    router.push("/"); // Redirect to home page
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-black text-white flex justify-center">
      <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-lg w-full">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center text-4xl">
            {user.name[0]}
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-6">
          <div>
            <p className="text-gray-400 text-sm">Full Name</p>
            <p className="text-white text-lg font-semibold">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white text-lg font-semibold">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Bio</p>
            <p className="text-gray-300">{user.bio || "No bio added."}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex gap-3">
          <Link
            href="/profile/edit"
            className="flex-1 py-3 bg-primary rounded-xl text-center font-semibold hover:bg-red-600 transition"
          >
            Edit Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex-1 py-3 bg-gradient-to-r from-primary to-red-700 rounded-xl font-semibold hover:from-red-700 hover:to-primary transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}