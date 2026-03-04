import { prisma } from "@/lib/prisma";

export default async function AttendancePage() {
  const classes = await prisma.class.findMany({
    where: { schoolId: 1 },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Attendance Module
        </h1>
        <p className="text-gray-400 mt-2">
          Manage and analyze daily class attendance
        </p>
      </div>

      {/* Empty State */}
      {classes.length === 0 && (
        <div className="bg-white/5 border border-white/10 p-8 rounded-xl text-gray-400">
          No classes available. Please create a class first.
        </div>
      )}

      {/* Classes Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition"
          >
            {/* Class Name */}
            <h3 className="text-xl font-semibold mb-2">
              {cls.name} {cls.section || ""}
            </h3>

            <p className="text-gray-400 text-sm mb-6">
              Attendance Controls & Reports
            </p>

            {/* Buttons */}
            <div className="flex gap-3 flex-wrap">
              <a
                href={`/school/attendance/mark?classId=${cls.id}`}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-sm"
              >
                Mark
              </a>

              <a
                href={`/school/attendance/history?classId=${cls.id}`}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-sm"
              >
                History
              </a>

              <a
                href={`/school/attendance/percentage?classId=${cls.id}`}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-sm"
              >
                Percentage
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}