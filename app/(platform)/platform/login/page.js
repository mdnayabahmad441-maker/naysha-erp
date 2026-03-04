"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/platform/login", {
      method: "POST",
      body: new URLSearchParams({
        email,
        password,
      }),
    });

   if (res.ok) {
  const data = await res.json();

  if (data.role === "SUPER_ADMIN") {
    router.push("/platform/dashboard");
  } else if (data.role === "SCHOOL_ADMIN") {
    router.push("/school/dashboard");
  }
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-xl w-96"
      >
        <h1 className="text-white text-2xl mb-6">Platform Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 bg-gray-800 text-white rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}