"use client";

import { useState } from "react";

export default function AttendanceHistory() {
  const [records, setRecords] = useState([]);

  const fetchHistory = async () => {
    const res = await fetch("/api/attendance/history");
    const data = await res.json();
    setRecords(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Attendance Report
      </h1>

      <button
        onClick={fetchHistory}
        className="mb-6 px-4 py-2 bg-cyan-600 rounded"
      >
        Load Report
      </button>

      <div className="space-y-4">
        {records.map((r) => (
          <div
            key={r.id}
            className="bg-white/10 p-4 rounded-lg"
          >
            {r.date} — {r.student.name} — {r.status}
          </div>
        ))}
      </div>
    </div>
  );
}