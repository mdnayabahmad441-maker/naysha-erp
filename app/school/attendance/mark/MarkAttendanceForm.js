"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";

export default function MarkAttendanceForm({ students, classId }) {
  const router = useRouter();
  const [toast, setToast] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const [attendance, setAttendance] = useState(
    students.map((s) => ({
      studentId: s.id,
      status: "PRESENT",
    }))
  );

  const handleToggle = (studentId) => {
    setAttendance((prev) =>
      prev.map((a) =>
        a.studentId === studentId
          ? {
              ...a,
              status:
                a.status === "PRESENT"
                  ? "ABSENT"
                  : "PRESENT",
            }
          : a
      )
    );
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classId,
        date: today,
        attendance,
      }),
    });

    if (res.ok) {
      setToast("Attendance saved successfully ✅");
      setTimeout(() => {
        router.push("/school/attendance");
      }, 1500);
    } else {
      setToast("Attendance already marked ❌");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Mark Attendance ({today})
      </h1>

      <div className="space-y-4">
        {students.map((student) => {
          const record = attendance.find(
            (a) => a.studentId === student.id
          );

          return (
            <div
              key={student.id}
              className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-lg"
            >
              <span>{student.name}</span>

              <button
                onClick={() =>
                  handleToggle(student.id)
                }
                className={`px-4 py-2 rounded ${
                  record.status === "PRESENT"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {record.status}
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 px-6 py-3 rounded bg-gradient-to-r from-cyan-500 to-purple-600"
      >
        Save Attendance
      </button>

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}