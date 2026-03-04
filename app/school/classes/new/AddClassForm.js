"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";

export default function AddClassForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    section: "",
  });

  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setToast("Class added successfully ✅");

      setTimeout(() => {
        router.push("/school/classes");
        router.refresh();
      }, 1500);
    } else {
      setToast("Failed to add class ❌");
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Add Class
      </h1>

      <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
        <div>
          <label className="block mb-2 text-gray-300">Class Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-white/10 border border-white/20"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-300">Section</label>
          <input
            name="section"
            value={form.section}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 border border-white/20"
          />
        </div>

        <button
          disabled={loading}
          className="px-6 py-3 rounded bg-gradient-to-r from-cyan-500 to-purple-600"
        >
          {loading ? "Saving..." : "Add Class"}
        </button>
      </form>

      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </div>
  );
}