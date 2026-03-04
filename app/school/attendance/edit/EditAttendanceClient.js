"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditAttendanceClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const classId = searchParams.get("classId");
  const date = searchParams.get("date");

  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!classId || !date) return;

    const fetchAttendance = async () => {
      const res = await fetch(
        `/api/attendance?classId=${classId}&date=${date}`
      );
      const data = await res.json();
      setRecords(data);
    };

    fetchAttendance();
  }, [classId, date]);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Edit Attendance ({date})
      </h1>

      {records.map((rec) => (
        <div key={rec.id}>{rec.student.name}</div>
      ))}
    </div>
  );
}