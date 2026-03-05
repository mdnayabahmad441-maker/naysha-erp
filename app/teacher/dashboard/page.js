import Link from "next/link";

export default function TeacherDashboard() {

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-8">
        Teacher Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <Link
          href="/teacher/attendance"
          className="bg-white/10 p-6 rounded-lg hover:bg-white/20"
        >
          Mark Attendance
        </Link>

        <Link
          href="/school/students"
          className="bg-white/10 p-6 rounded-lg hover:bg-white/20"
        >
          View Students
        </Link>

        <Link
          href="/school/homework"
          className="bg-white/10 p-6 rounded-lg hover:bg-white/20"
        >
          Upload Homework
        </Link>

      </div>

    </div>
  );
}