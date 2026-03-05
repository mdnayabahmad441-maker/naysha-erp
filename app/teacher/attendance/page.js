"use client";

import { useEffect, useState } from "react";

export default function TeacherAttendance() {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const res = await fetch("/api/teacher/students");
    const data = await res.json();
    setStudents(data);
  }

  function mark(studentId, status) {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  }

  async function saveAttendance() {
    await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: attendance,
      }),
    });

    alert("Attendance saved");
  }

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-8">
        Mark Attendance
      </h1>

      <div className="space-y-4">

        {students.map((student) => (
          <div
            key={student.id}
            className="flex justify-between bg-white/10 p-4 rounded"
          >
            <span>{student.name}</span>

            <div className="space-x-2">

              <button
                onClick={() => mark(student.id, "PRESENT")}
                className="bg-green-500 px-3 py-1 rounded"
              >
                Present
              </button>

              <button
                onClick={() => mark(student.id, "ABSENT")}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Absent
              </button>

            </div>
          </div>
        ))}

      </div>

      <button
        onClick={saveAttendance}
        className="mt-6 bg-purple-600 px-6 py-2 rounded"
      >
        Save Attendance
      </button>

    </div>
  );
}