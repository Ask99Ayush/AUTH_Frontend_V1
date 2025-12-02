"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import authService from "../../../services/auth.service";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // DUMMY LOGIN FOR TESTING - Accepts both email format and simple "admin"
      const isDummyLogin = 
        (email === "admin" || email === "admin@example.com") && 
        password === "admin";
      
      if (isDummyLogin) {
        console.log("✅ Using dummy admin login");
        
        // Create a realistic dummy token (simulate JWT format)
        const dummyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." + 
                          "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9." +
                          "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        
        // Store token in AuthContext
        setToken(dummyToken);
        
        // Also store user info directly in localStorage for immediate access
        localStorage.setItem("tf_user", JSON.stringify({
          id: "1",
          name: "Admin User",
          email: "admin@example.com"
        }));
        
        // Redirect to feed
        router.push("/feed");
        return;
      }

      // Original API login for real users
      const res = await authService.login({ email, password });
      setToken(res.token);
      router.push("/feed");
    } catch (err: any) {
      // Check if it's a network error or API error
      if (err.message === "Network Error" || !err.response) {
        setError("Cannot connect to server. Use admin/admin for demo.");
      } else {
        setError(err?.response?.data?.error || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-gray-900 to-black"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-md">
        {/* Netflix-style card */}
        <div className="glass-card rounded-2xl p-8 border border-white/10 shadow-2xl shadow-black/30">
          
          {/* Cinematic logo header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-red-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">CF</span>
              </div>
              <h1 className="text-3xl font-bold font-netflix">
                Cine<span className="text-gradient">Flow</span>
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your cinematic workspace</p>
            
            {/* Dummy Credentials Notice */}
            <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="text-blue-400 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-300 font-medium mb-1">Demo Login Available</p>
                  <p className="text-xs text-blue-400">
                    Use <span className="font-mono bg-blue-900/50 px-1 py-0.5 rounded">admin</span> / 
                    <span className="font-mono bg-blue-900/50 px-1 py-0.5 rounded ml-1">admin</span>
                  </p>
                  <p className="text-xs text-blue-400 mt-1">
                    Or use <span className="font-mono bg-blue-900/50 px-1 py-0.5 rounded">admin@example.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-6">
            
            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2" />
                  </svg>
                </div>
                <input
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter email or 'admin'"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter password or 'admin'"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 text-red-300 border border-red-700/50 px-4 py-3 rounded-xl text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Quick Login Button for Demo */}
          <div className="mt-6">
            <button
              onClick={() => {
                setEmail("admin");
                setPassword("admin");
                // Auto-submit after a short delay
                setTimeout(() => {
                  const form = document.querySelector("form");
                  if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                }, 100);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Demo Login (admin/admin)
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-gray-400 text-sm">
              New to CineFlow?{" "}
              <Link href="/register" className="text-primary hover:text-red-400 font-medium transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-primary/5 to-cyan-500/5 blur-3xl"></div>
      </div>
    </div>
  );
}