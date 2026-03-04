import { prisma } from "../../../../lib/prisma";
import Link from "next/link";

export default async function SchoolsPage() {
  const schools = await prisma.school.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      subscriptions: {
        orderBy: { startDate: "desc" },
        take: 1,
      },
    },
  });

  function getStatusColor(status) {
    if (status === "ACTIVE")
      return "bg-green-500/20 text-green-400";
    if (status === "EXPIRED")
      return "bg-red-500/20 text-red-400";
    return "bg-gray-500/20 text-gray-400";
  }

  return (
    <div className="p-10 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Schools Management
        </h1>

        <Link
          href="/platform/schools/create"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold"
        >
          + Create School
        </Link>
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        {schools.length === 0 ? (
          <p>No schools onboarded yet.</p>
        ) : (
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="py-3 text-left">School</th>
                <th className="text-left">Plan</th>
                <th className="text-left">Status</th>
                <th className="text-left">Expiry</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {schools.map((school) => {
                const subscription = school.subscriptions[0];

                let computedStatus = null;

                if (subscription) {
                  const today = new Date();
                  const end = new Date(subscription.endDate);

                  if (end < today) {
                    computedStatus = "EXPIRED";
                  } else {
                    computedStatus = "ACTIVE";
                  }
                }

                return (
                  <tr
                    key={school.id}
                    className="border-b border-white/5"
                  >
                    <td className="py-4">
                      {school.name}
                    </td>

                    <td>
                      {subscription
                        ? `₹${subscription.price}`
                        : "—"}
                    </td>

                    <td>
                      {subscription ? (
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                            computedStatus
                          )}`}
                        >
                          {computedStatus}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td>
                      {subscription
                        ? new Date(
                            subscription.endDate
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td>
                      {computedStatus === "EXPIRED" && (
                        <form
                          action={`/platform/schools/${school.id}/renew`}
                          method="post"
                        >
                          <button className="text-blue-400 underline">
                            Renew
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}