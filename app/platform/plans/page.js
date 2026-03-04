"use client";

import { useEffect, useState } from "react";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    name: "",
    priceMonthly: "",
    priceYearly: "",
    studentLimit: "",
    teacherLimit: "",
  });

  const fetchPlans = async () => {
    const res = await fetch("/api/platform/plans");
    const data = await res.json();
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    await fetch("/api/platform/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        priceMonthly: Number(form.priceMonthly),
        priceYearly: Number(form.priceYearly),
        studentLimit: Number(form.studentLimit),
        teacherLimit: Number(form.teacherLimit),
        features: {},
      }),
    });

    setForm({
      name: "",
      priceMonthly: "",
      priceYearly: "",
      studentLimit: "",
      teacherLimit: "",
    });

    fetchPlans();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B1120] text-white px-16 py-20">

      {/* Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/20 via-[#1e293b] to-[#7c3aed]/30"></div>

      {/* Right Side Glow */}
      <div className="absolute right-0 top-1/3 w-[600px] h-[600px] bg-purple-600 opacity-30 blur-[140px] rounded-full"></div>

      <div className="relative z-10">

        {/* Heading */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-16">
          Subscription Plans
        </h1>

        {/* Create Plan Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-xl shadow-2xl mb-20">

          <form onSubmit={handleCreate} className="space-y-5">

            {[
              { label: "Plan Name", name: "name" },
              { label: "Monthly Price (₹)", name: "priceMonthly" },
              { label: "Yearly Price (₹)", name: "priceYearly" },
              { label: "Student Limit", name: "studentLimit" },
              { label: "Teacher Limit", name: "teacherLimit" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              />
            ))}

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition"
            >
              Create Plan
            </button>

          </form>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:scale-105 transition"
            >
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {plan.name}
              </h2>

              <p className="text-gray-300 mb-2">
                Monthly: ₹{plan.priceMonthly}
              </p>

              <p className="text-gray-300 mb-2">
                Yearly: ₹{plan.priceYearly}
              </p>

              <p className="text-gray-400 text-sm">
                Students: {plan.studentLimit} | Teachers: {plan.teacherLimit}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}