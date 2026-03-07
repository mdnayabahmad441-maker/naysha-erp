"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">

      <div className="bg-black/60 backdrop-blur-xl p-10 rounded-2xl w-[420px] text-center shadow-xl">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        {/* Google Login */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/school/dashboard" })
          className="w-full bg-white text-black py-3 rounded-lg mb-4 font-semibold hover:bg-gray-200"
        >
          Continue with Google
        </button>

        {/* Email Login */}
        <button
          onClick={() => signIn("email", { callbackUrl: "/platform" })}
          className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700"
        >
          Login with Email
        </button>

      </div>

    </div>
  );
}