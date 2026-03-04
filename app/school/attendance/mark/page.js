"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function MarkAttendancePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const classId = searchParams.get("classId");

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [alreadyMarked, setAlreadyMarked] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // Fetch students
  useEffect(() => {
    if (!classId) return;

    const fetchStudents = async () => {
      const res = await fetch(`/api/students?classId=${classId}`);
      const data = await res.json();
      setStudents(data);
    };

    fetchStudents();
  }, [classId]);

  // Check if attendance already marked
  useEffect(() => {
    if (!classId) return;

    const checkAttendance = async () => {
      const res = await fetch(
        `/api/attendance/check?classId=${classId}&date=${today}`
      );

      if (res.ok) {
        const data = await res.json();
        if (data.exists) {
          setAlreadyMarked(true);
        }
      }
    };

    checkAttendance();
  }, [classId, today]);

  const toggleStatus = (studentId, status) => {
    if (alreadyMarked) return;

    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const saveAttendance = async () => {
    if (alreadyMarked) {
      toast.error("Attendance already marked for today");
      return;
    }

    if (Object.keys(attendance).length === 0) {
      toast.error("Mark at least one student");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classId: parseInt(classId),
        date: today,
        records: attendance,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed");
      setAlreadyMarked(true);
    } else {
      toast.success("Attendance saved successfully");
      router.push("/school/attendance");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">
        Mark Attendance ({today})
      </h1>

      {alreadyMarked && (
        <div className="mb-6 bg-red-600/30 border border-red-400 p-4 rounded-lg">
          Attendance already marked for today. Editing is locked.
        </div>
      )}

      <div className="space-y-6">
        {students.map((student) => {
          const status = attendance[student.id];

          return (
            <div
              key={student.id}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl flex justify-between items-center"
            >
              <span className="text-lg font-medium">
                {student.name}
              </span>

              <div className="space-x-3">
                <button
                  disabled={alreadyMarked}
                  onClick={() =>
                    toggleStatus(student.id, "ABSENT")
                  }
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    status === "ABSENT"
                      ? "bg-red-600"
                      : "bg-red-500/50 hover:bg-red-600"
                  } ${alreadyMarked ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  ABSENT
                </button>

                <button
                  disabled={alreadyMarked}
                  onClick={() =>
                    toggleStatus(student.id, "PRESENT")
                  }
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    status === "PRESENT"
                      ? "bg-green-600"
                      : "bg-green-500/50 hover:bg-green-600"
                  } ${alreadyMarked ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  PRESENT
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        disabled={alreadyMarked || loading}
        onClick={saveAttendance}
        className="mt-10 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Attendance"}
      </button>
    </div>
  );
}