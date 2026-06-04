"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://m.media-amazon.com/images/I/91J46wFxGrL.jpg')",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* GLASS CARD */}
      <div
        className="relative w-full max-w-md p-8 rounded-2xl
        bg-white/10 backdrop-blur-sm border border-white/20
        shadow-2xl text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-white/70 mb-6">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-sm text-white/80">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 rounded-lg
              bg-white/10 border border-white/20
              outline-none focus:ring-2 focus:ring-white/40
              placeholder-white/50 text-white"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-white/80">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 rounded-lg
              bg-white/10 border border-white/20
              outline-none focus:ring-2 focus:ring-white/40
              placeholder-white/50 text-white"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold
            bg-white text-black hover:bg-white/90 transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-white/70">
            Don’t have an account?{" "}
            <a href="/signup" className="text-white font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}