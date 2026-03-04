"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/app/components/Toast";

export default function EditTeacherForm({ teacher, classes }) {
  const router = useRouter();

  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: teacher?.name || "",
    email: teacher?.email || "",
    phone: teacher?.phone || "",
    classId: teacher?.classId || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      setToast("Name and Email are required ❗");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/teachers/${teacher.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          classId: form.classId ? Number(form.classId) : null,
        }),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      setToast("Teacher updated successfully ✅");

      setTimeout(() => {
        router.push("/school/teachers");
        router.refresh();
      }, 1200);
    } catch (err) {
      setToast("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur"
    >
      {/* Name Email Phone */}
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
            required={field !== "phone"}
            className="w-full p-3 rounded bg-white/10 border border-white/20 text-white outline-none focus:border-cyan-400"
          />
        </div>
      ))}

      {/* Class Select */}
      <div>
        <label className="block mb-2 text-gray-300">
          Assign Class
        </label>

        <select
          name="classId"
          value={form.classId}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/10 border border-white/20 text-white outline-none"
        >
          <option value="" className="text-black">
            Not Assigned
          </option>

          {classes?.map((cls) => (
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Teacher"}
      </button>

      {/* Toast */}
      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </form>
  );
}