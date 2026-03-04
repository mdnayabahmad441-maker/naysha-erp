import { prisma } from "@/lib/prisma";

export default async function PercentagePage({ searchParams }) {
  const classId = parseInt(searchParams.classId);

  if (!classId) {
    return <p className="text-red-400">Invalid Class</p>;
  }

  // Get all students in class
  const students = await prisma.student.findMany({
    where: { classId },
    include: {
      attendances: true,
    },
    orderBy: { name: "asc" },
  });

  // Get total working days for class
  const totalDays = await prisma.attendance.groupBy({
    by: ["date"],
    where: { classId },
  });

  const workingDays = totalDays.length;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Attendance Percentage
      </h1>

      {workingDays === 0 && (
        <p className="text-gray-400">
          No attendance records found.
        </p>
      )}

      <div className="space-y-4">
        {students.map((student) => {
          const presentCount = student.attendances.filter(
            (a) => a.status === "PRESENT"
          ).length;

          const percentage =
            workingDays === 0
              ? 0
              : Math.round((presentCount / workingDays) * 100);

          return (
            <div
              key={student.id}
              className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-lg"
            >
              <div>
                <h3 className="font-semibold">
                  {student.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  Present: {presentCount} / {workingDays}
                </p>
              </div>

              <div
                className={`text-lg font-bold ${
                  percentage >= 75
                    ? "text-green-400"
                    : percentage >= 50
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}