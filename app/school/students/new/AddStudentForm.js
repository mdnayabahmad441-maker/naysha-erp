"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";

export default function AddStudentForm({ classes }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    phone: "",
    email: "",
    classId: "",
  });

  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setToast("Student added successfully ✅");

      setTimeout(() => {
        router.push("/school/students");
        router.refresh();
      }, 1500);
    } else {
      setToast("Something went wrong ❌");
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Add Student
      </h1>

      <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">

        {["name", "rollNo", "phone", "email"].map((field) => (
          <div key={field}>
            <label className="block mb-2 text-gray-300 capitalize">
              {field}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={field === "name" || field === "rollNo"}
              className="w-full p-3 rounded bg-white/10 border border-white/20 text-white"
            />
          </div>
        ))}

        {/* ✅ FIXED DROPDOWN */}
        <div>
          <label className="block mb-2 text-gray-300">Class</label>

          <select
            name="classId"
            value={form.classId}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/10 border border-white/20 text-white"
          >
            <option value="" className="bg-gray-900 text-white">
              Not Assigned
            </option>

            {classes.map((cls) => (
              <option
                key={cls.id}
                value={cls.id}
                className="bg-gray-900 text-white"
              >
                {cls.name}
                {cls.section ? ` - ${cls.section}` : ""}
              </option>
            ))}
          </select>
        </div>

        <button
          disabled={loading}
          className="px-6 py-3 rounded bg-gradient-to-r from-cyan-500 to-purple-600"
        >
          {loading ? "Saving..." : "Add Student"}
        </button>
      </form>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}