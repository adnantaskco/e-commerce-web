"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ring/10 px-4">
      <div className="w-full max-w-md bg-background p-8 rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Sign Up
        </h1>

        <p className="text-center text-ring mb-6">
          Create your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-text-primary mb-2 text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-primary rounded-md p-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-text-primary mb-2 text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-primary rounded-md p-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-primary rounded-md p-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-text-primary text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-primary rounded-md p-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-primary text-background py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-ring">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}