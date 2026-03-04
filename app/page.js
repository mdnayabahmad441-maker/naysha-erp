import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">

      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Naysha ERP</h1>

        <Link
          href="/login"
          className="px-5 py-2 rounded-lg bg-white text-black font-semibold"
        >
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <section className="text-center mt-20 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Smart School Management System
        </h2>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Manage students, teachers, fees, attendance, and reports in one
          powerful cloud platform designed for modern schools.
        </p>

        <Link
          href="/login"
          className="px-8 py-4 text-lg rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="mt-28 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        <div className="bg-white/10 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">
            Student Management
          </h3>
          <p className="text-gray-300">
            Easily manage student records, classes, and academic history.
          </p>
        </div>

        <div className="bg-white/10 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">
            Fee Management
          </h3>
          <p className="text-gray-300">
            Track fee payments, generate receipts, and view pending dues.
          </p>
        </div>

        <div className="bg-white/10 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-3">
            Attendance Tracking
          </h3>
          <p className="text-gray-300">
            Record daily attendance and monitor student performance.
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="text-center mt-24 pb-10 text-gray-400">
        © {new Date().getFullYear()} Naysha ERP. All rights reserved.
      </footer>

    </div>
  );
}