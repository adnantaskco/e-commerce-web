"use client";

import Image from "next/image";
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

    console.log({ name, email, password });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-10 ">
        <div className="text-center">

          <Image
            src="data:image/jpeg;base64,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"
            alt="Sign Up"
            width={400}
            height={400}
            className="mx-auto"
          />

          <h2 className="text-2xl font-bold mt-6">
            Join Our Store 🛒
          </h2>

          <p className="text-gray-700 mt-2">
            Create an account and start shopping
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-8">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4"
        >

          <h1 className="text-3xl font-bold text-center mb-4">
            Create Account
          </h1>

          {/* NAME */}
          <div>
            <label className="text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded mt-1 outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your name"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded mt-1 outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded mt-1 outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter password"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border p-3 rounded mt-1 outline-none focus:ring-2 focus:ring-black"
              placeholder="Confirm password"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Sign Up
          </button>

          {/* LINK */}
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <span className="text-black font-semibold cursor-pointer">
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}