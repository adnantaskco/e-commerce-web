"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc"; // npm install react-icons

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Email/Password Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password!");
      } else if (result?.ok) {
        router.push("/profile");
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login Handler
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/profile" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl text-primary font-bold text-center mb-2">Login</h1>

        <p className="text-center text-gray-500 mb-6">
          Enter your account details
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200 text-center">
            {error}
          </div>
        )}

        {/* 💥 GOOGLE LOGIN BUTTON 💥 */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mb-4 flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition cursor-pointer font-medium text-sm shadow-sm"
        >
          <FcGoogle size={22} />
          Sign in with Google
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-3 text-xs text-gray-400 uppercase">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-primary rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-primary rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-md hover:opacity-90 disabled:opacity-50 cursor-pointer transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}