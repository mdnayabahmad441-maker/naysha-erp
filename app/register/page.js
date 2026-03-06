import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">

      <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl w-[420px]">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create School</h1>

          <Link
            href="/login"
            className="text-sm text-cyan-300 hover:underline"
          >
            Sign In
          </Link>
        </div>

        {/* Form */}

        <form className="space-y-4">

          <input
            type="text"
            placeholder="School Name"
            className="w-full p-3 rounded bg-white/10 border border-white/20"
          />

          <input
            type="text"
            placeholder="Admin Name"
            className="w-full p-3 rounded bg-white/10 border border-white/20"
          />

          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 rounded bg-white/10 border border-white/20"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-white/10 border border-white/20"
          />

          <button
            type="submit"
            className="w-full py-3 rounded bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold"
          >
            Create School
          </button>

        </form>

        {/* Bottom */}

        <p className="text-center text-sm mt-6 text-gray-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-cyan-400 hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}