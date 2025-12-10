"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import authService from "../../../services/auth.service";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { token, setToken, logout } = useAuth(); // get logout from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // DUMMY LOGIN FOR TESTING
      const isDummyLogin =
        (email === "admin" || email === "admin@example.com") &&
        password === "admin";

      if (isDummyLogin) {
        const dummyToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
          "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9." +
          "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

        setToken(dummyToken);

        localStorage.setItem(
          "tf_user",
          JSON.stringify({
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
          })
        );

        router.push("/feed");
        return;
      }

      // Original API login
      const res = await authService.login({ email, password });
      setToken(res.token);
      router.push("/feed");
    } catch (err: any) {
      if (err.message === "Network Error" || !err.response) {
        setError("Cannot connect to server. Use admin/admin for demo.");
      } else {
        setError(err?.response?.data?.error || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout function redirecting to home page
  const handleLogout = () => {
    logout(); // clear token & localStorage
    router.push("/"); // redirect to home
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-gray-900 to-black"></div>

      <div className="relative w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 border border-white/10 shadow-2xl shadow-black/30">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-red-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">TF</span>
              </div>
              <h1 className="text-3xl font-bold font-netflix">
                Tine<span className="text-gradient">Flow</span>
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your cinematic workspace</p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2"
                    />
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
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

            {error && (
              <div className="bg-red-900/30 text-red-300 border border-red-700/50 px-4 py-3 rounded-xl text-sm">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Demo Login */}
          <div className="mt-6">
            <button
              onClick={() => {
                setEmail("admin");
                setPassword("admin");
                setTimeout(() => {
                  const form = document.querySelector("form");
                  if (form)
                    form.dispatchEvent(
                      new Event("submit", { cancelable: true, bubbles: true })
                    );
                }, 100);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Quick Demo Login (admin/admin)
            </button>
          </div>

          {/* Logout button */}
          {token && (
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-gray-400 text-sm">
              New to TineFlow?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-red-400 font-medium transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
