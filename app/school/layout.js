import Link from "next/link";

export default function SchoolLayout({ children }) {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-slate-900 via-blue-950 to-purple-900 text-white">
      
      <div className="mb-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          NaySha ERP
        </h1>

        <nav className="flex gap-6 mt-4 text-lg">
          <Link href="/school/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>

          <Link href="/school/students" className="hover:text-blue-400">
            Students
          </Link>

          <Link href="/school/teachers" className="hover:text-blue-400">
            Teachers
          </Link>

          <Link href="/school/classes" className="hover:text-blue-400">
            Classes
          </Link>

          <Link href="/school/attendance" className="hover:text-blue-400">
            Attendance
          </Link>

          <Link href="/school/fees" className="hover:text-blue-400">
            Fees
          </Link>
        </nav>
      </div>

      {children}
    </div>
  );
}