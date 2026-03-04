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

  useEffect(() => {
    async function fetchStats() {
      const [studentsRes, teachersRes, classesRes] = await Promise.all([
        fetch("/api/students"),
        fetch("/api/teachers"),
        fetch("/api/classes"),
      ]);

      const students = await studentsRes.json();
      const teachers = await teachersRes.json();
      const classes = await classesRes.json();

      setStats({
        students: students.length,
        teachers: teachers.length,
        classes: classes.length,
      });
    }

    fetchStats();
  }, []);

  const data = [
    { name: "Students", value: stats.students },
    { name: "Teachers", value: stats.teachers },
    { name: "Classes", value: stats.classes },
  ];

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-8">School Dashboard</h1>

      <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}