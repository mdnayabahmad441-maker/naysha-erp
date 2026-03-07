"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {

  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchStats() {

      try {

        const studentsRes = await fetch("/api/students");
        const teachersRes = await fetch("/api/teacher")
        const classesRes = await fetch("/api/classes");

        const students = studentsRes.ok ? await studentsRes.json() : [];
        const teachers = teachersRes.ok ? await teachersRes.json() : [];
        const classes = classesRes.ok ? await classesRes.json() : [];

        setStats({
          students: Array.isArray(students) ? students.length : 0,
          teachers: Array.isArray(teachers) ? teachers.length : 0,
          classes: Array.isArray(classes) ? classes.length : 0,
        });

      } catch (error) {
        console.error("Dashboard error:", error);
      }

      setLoading(false);
    }

    fetchStats();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        Loading Dashboard...
      </div>
    );
  }

  const data = [
    { name: "Students", value: stats.students },
    { name: "Teachers", value: stats.teachers },
    { name: "Classes", value: stats.classes },
  ];

  return (
    <div className="min-h-screen p-10 text-white bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">

      <h1 className="text-3xl font-bold mb-8">
        School Dashboard
      </h1>

      <div className="bg-white/10 backdrop-blur p-6 rounded-xl">

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Bar dataKey="value" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}