"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";

export default function EditProfilePage() {
  const router = useRouter();
  const { token } = useAuth();
  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const savedUser = localStorage.getItem("tf_user");
    if (savedUser) {
      const u = JSON.parse(savedUser);
      setUser(u);
      setName(u.name);
      setBio(u.bio || "");
      setEmail(u.email);
    }
  }, [token]);

  const save = () => {
    const updatedUser = { ...user, name, bio, email };

    localStorage.setItem("tf_user", JSON.stringify(updatedUser));

    router.push("/profile");
  };

  return (
    <div className="min-h-screen p-6 bg-black text-white flex justify-center">
      <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-lg w-full">

        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

        {/* Name */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
          />
        </div>

        <button
          onClick={save}
          className="w-full py-3 bg-primary rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
