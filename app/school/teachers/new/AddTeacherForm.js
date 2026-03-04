"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/app/components/Toast";

export default function AddTeacherForm({ classes }) {
  const router = useRouter();
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    classId: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setToast("Teacher added successfully ✅");
      setTimeout(() => {
        router.push("/school/teachers");
      }, 1200);
    } else {
      setToast("Failed to add teacher ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10"
    >
      {["name", "email", "phone"].map((field) => (
        <div key={field}>
          <label className="block mb-2 text-gray-300 capitalize">
            {field}
          </label>
          <input
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            required={field === "name"}
            className="w-full p-3 rounded bg-white/10 border border-white/20 text-white"
          />
        </div>
      ))}

      <div>
        <label className="block mb-2 text-gray-300">
          Assign Class
        </label>
        <select
          name="classId"
          value={form.classId}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/10 border border-white/20 text-white"
        >
          <option value="" className="text-black">
            Not Assigned
          </option>
          {classes.map((cls) => (
            <option
              key={cls.id}
              value={cls.id}
              className="text-black"
            >
              {cls.name} {cls.section || ""}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600"
      >
        Add Teacher
      </button>

      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </form>
  );
}