import { prisma } from "@/lib/prisma";

export default async function ParentDashboard() {

  // temporary parent id until login system is implemented
  const parentId = 1;

  const student = await prisma.student.findFirst({
    where: { parentId },
    include: {
      class: true,
      fees: true,
      attendance: true
    }
  });

  if (!student) {
    return (
      <div className="p-10 text-white">
        No student linked to this parent.
      </div>
    );
  }

  const totalFees = student.fees.reduce((sum, f) => sum + f.amount, 0);
  const paidFees = student.fees
    .filter((f) => f.status === "PAID")
    .reduce((sum, f) => sum + f.amount, 0);

  const dueFees = totalFees - paidFees;

  const presentDays = student.attendance.filter(
    (a) => a.status === "PRESENT"
  ).length;

  return (
    <div className="p-10 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Parent Dashboard
      </h1>

      {/* Student Info */}

      <div className="bg-white/10 p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          {student.name}
        </h2>

        <p>
          Class: {student.class?.name} {student.class?.section}
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/10 p-6 rounded-xl">
          <h3 className="text-lg mb-2">
            Total Fees
          </h3>

          <p className="text-3xl font-bold">
            ₹{totalFees}
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl">
          <h3 className="text-lg mb-2">
            Paid Fees
          </h3>

          <p className="text-3xl font-bold text-green-400">
            ₹{paidFees}
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl">
          <h3 className="text-lg mb-2">
            Due Fees
          </h3>

          <p className="text-3xl font-bold text-red-400">
            ₹{dueFees}
          </p>
        </div>

      </div>

      {/* Attendance */}

      <div className="mt-10 bg-white/10 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">
          Attendance
        </h3>

        <p>
          Present Days: {presentDays}
        </p>

        <p>
          Total Records: {student.attendance.length}
        </p>
      </div>

    </div>
  );
}