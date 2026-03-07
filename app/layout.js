"use client";

import { signOut } from "next-auth/react";

export default function SchoolLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-black text-white p-6">

        <h2 className="text-xl font-bold mb-6">
          NaySha ERP
        </h2>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-10 w-full bg-red-500 py-2 rounded-lg"
        >
          Logout
        </button>

      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}