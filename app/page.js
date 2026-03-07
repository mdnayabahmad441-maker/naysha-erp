import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          NaySha ERP
        </h1>

        <div className="flex gap-6">
          <Link
            href="/login"
            className="px-5 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6">

        <p className="text-purple-300 font-semibold mb-3 tracking-wide">
          NaySha Automation
        </p>

        <h2 className="text-5xl font-bold mb-6">
          Smart School ERP Platform
        </h2>

        <p className="text-lg text-gray-300 max-w-2xl mb-10">
          A modern cloud based ERP system designed for schools to manage
          students, teachers, attendance, fees, results and administration
          from one powerful dashboard.
        </p>

        <Link
          href="/login"
          className="px-8 py-3 bg-purple-600 rounded-xl text-white font-semibold hover:bg-purple-700 transition"
        >
          Get Started
        </Link>

      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400">
        © 2026 NaySha ERP
      </footer>

    </main>
  );
}