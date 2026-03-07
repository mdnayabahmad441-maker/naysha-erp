import Link from "next/link";

export default function PlatformDashboard() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        NaySha ERP Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <Link
          href="/admin/students"
          className="bg-black/40 p-6 rounded-xl text-center hover:bg-black/60 transition"
        >
          Students
        </Link>

        <Link
          href="/admin/teacher"
          className="bg-black/40 p-6 rounded-xl text-center hover:bg-black/60 transition"
        >
          Teachers
        </Link>

        <Link
          href="/admin/attendance"
          className="bg-black/40 p-6 rounded-xl text-center hover:bg-black/60 transition"
        >
          Attendance
        </Link>

        <Link
          href="/admin/fees"
          className="bg-black/40 p-6 rounded-xl text-center hover:bg-black/60 transition"
        >
          Fees
        </Link>

      </div>

    </div>
  );
}