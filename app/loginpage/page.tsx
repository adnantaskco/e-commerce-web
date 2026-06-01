"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE - IMAGE / ANIMATION */}
      <div className="md:w-1/2 w-full bg-black flex items-center justify-center p-10">
        <div className="text-center text-white">
          
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX3Z_uuNbS2o_wmq3JVAoyxT18auBT2wZ9cg&s" 
            width={400}
            height={400}
            className="mx-auto"
          />

          <h2 className="text-2xl font-bold mt-6">
            Welcome Back 👋
          </h2>

          <p className="text-gray-300 mt-2">
            Login to continue your shopping experience
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-8">
        
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-5"
        >

          <h1 className="text-3xl font-bold text-center mb-6">
            Sign In
          </h1>

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
              placeholder="Enter your password"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Login
          </button>

          {/* EXTRA */}
          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <span className="text-black font-semibold cursor-pointer">
              <a href="/signup">Sign Up</a>
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}