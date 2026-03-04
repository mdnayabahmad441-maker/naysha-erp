"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditAttendancePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const classId = searchParams.get("classId");
  const date = searchParams.get("date");

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const res = await fetch(
        `/api/attendance/edit?classId=${classId}&date=${date}`
      );
      const data = await res.json();
      setRecords(data);
    };

    fetchAttendance();
  }, [classId, date]);

  const toggleStatus = (id, status) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status } : r
      )
    );
  };

  const saveChanges = async () => {
    const res = await fetch("/api/attendance/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(records),
    });

    if (res.ok) {
      toast.success("Attendance updated");
      router.push("/school/attendance");
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Edit Attendance ({date})
      </h1>

      <div className="space-y-6">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-white/10 p-6 rounded-xl flex justify-between"
          >
            <span>{record.student.name}</span>

            <div className="space-x-3">
              <button
                onClick={() =>
                  toggleStatus(record.id, "ABSENT")
                }
                className={`px-4 py-2 rounded ${
                  record.status === "ABSENT"
                    ? "bg-red-600"
                    : "bg-red-500/50"
                }`}
              >
                ABSENT
              </button>

              <button
                onClick={() =>
                  toggleStatus(record.id, "PRESENT")
                }
                className={`px-4 py-2 rounded ${
                  record.status === "PRESENT"
                    ? "bg-green-600"
                    : "bg-green-500/50"
                }`}
              >
                PRESENT
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={saveChanges}
        className="mt-10 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
}