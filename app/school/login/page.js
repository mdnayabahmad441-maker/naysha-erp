"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SchoolLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/school/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/school/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold">School Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 bg-gray-800 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 bg-gray-800 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-purple-600 p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}