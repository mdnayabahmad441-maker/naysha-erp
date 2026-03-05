"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";

export default function Home() {

  async function subscribe(plan) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    });

    const data = await res.json();

    window.location.href = data.url;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">

      {/* HEADER */}

     <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">

  <h1 className="text-2xl font-bold">
    Naysha ERP
  </h1>

  <div className="flex gap-4">

    <Link
      href="/login"
      className="px-5 py-2 rounded-lg border border-white hover:bg-white hover:text-black transition"
    >
      Sign In
    </Link>

    <Link
      href="/register"
      className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition font-semibold"
    >
      Sign Up
    </Link>

  </div>

</header>

      {/* HERO */}

      <section className="text-center mt-20 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Smart School Management System
        </h2>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Manage students, teachers, fees, attendance, and reports in one
          powerful cloud platform designed for modern schools.
        </p>
      </section>

      {/* PRICING */}

      <section className="mt-28 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* BASIC */}

        <div className="bg-white/10 p-10 rounded-xl text-center">
          <h3 className="text-2xl font-bold">
            Basic
          </h3>

          <p className="text-4xl font-bold mt-4">
            ₹1999
          </p>

          <p className="text-gray-300 mb-6">
            per month
          </p>

          <button
            onClick={() => subscribe("basic")}
            className="px-6 py-3 bg-cyan-500 rounded-lg hover:bg-cyan-600 transition"
          >
            Start Basic
          </button>
        </div>

        {/* GROWTH */}

        <div className="bg-white/10 p-10 rounded-xl text-center border border-cyan-400">
          <h3 className="text-2xl font-bold">
            Growth
          </h3>

          <p className="text-4xl font-bold mt-4">
            ₹3999
          </p>

          <p className="text-gray-300 mb-6">
            per month
          </p>

          <button
            onClick={() => subscribe("growth")}
            className="px-6 py-3 bg-purple-500 rounded-lg hover:bg-purple-600 transition"
          >
            Start Growth
          </button>
        </div>

        {/* PRO */}

        <div className="bg-white/10 p-10 rounded-xl text-center">
          <h3 className="text-2xl font-bold">
            Pro
          </h3>

          <p className="text-4xl font-bold mt-4">
            ₹7999
          </p>

          <p className="text-gray-300 mb-6">
            per month
          </p>

          <button
            onClick={() => subscribe("pro")}
            className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition"
          >
            Start Pro
          </button>
        </div>

      </section>

      {/* FOOTER */}

      <footer className="text-center mt-24 pb-10 text-gray-400">
        © {new Date().getFullYear()} Naysha ERP
      </footer>

    </div>
  );
}