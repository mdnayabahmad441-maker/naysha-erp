"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterSchool() {
  const router = useRouter();

  const [form, setForm] = useState({
    schoolName: "",
    adminName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register-school", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("School created successfully");
      router.push("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">

      <form
        onSubmit={register}
        className="bg-white/10 p-10 rounded-xl space-y-6 w-[420px]"
      >
        <h1 className="text-3xl font-bold text-center">
          Create Your School
        </h1>

        <input
          name="schoolName"
          placeholder="School Name"
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/10"
        />

        <input
          name="adminName"
          placeholder="Admin Name"
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/10"
        />

        <input
          name="email"
          type="email"
          placeholder="Admin Email"
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/10"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/10"
        />

        <button className="w-full py-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg font-semibold">
          Create School
        </button>
      </form>

    </div>
  );
}