import { prisma } from "@/lib/prisma";
import Card from "@/app/components/Card";
import DeleteTeacherButton from "@/app/components/DeleteTeacherButton";

export default async function TeachersPage({ searchParams }) {
  const user = { schoolId: 1 };

  const page = parseInt(searchParams?.page || "1");
  const search = searchParams?.search || "";
  const limit = 6;
  const skip = (page - 1) * limit;

  const teachers = await prisma.teacher.findMany({
    where: {
      schoolId: user.schoolId,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      class: true,
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.teacher.count({
    where: {
      schoolId: user.schoolId,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Teachers Management
        </h1>

        <a
          href="/school/teachers/new"
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600"
        >
          + Add Teacher
        </a>
      </div>

      <form className="mb-8">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search teacher..."
          className="w-full md:w-96 p-3 rounded bg-white/10 border border-white/20"
        />
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id}>
            <h3 className="text-xl font-semibold mb-2">
              {teacher.name}
            </h3>

            <p className="text-gray-400">
              Email: {teacher.email || "-"}
            </p>

            <p className="text-gray-400">
              Phone: {teacher.phone || "-"}
            </p>

            <p className="text-gray-400 mb-3">
              Class: {teacher.class
                ? `${teacher.class.name} ${teacher.class.section || ""}`
                : "Not Assigned"}
            </p>

            <div className="flex gap-6">
              <a
                href={`/school/teachers/edit/${teacher.id}`}
                className="text-cyan-400 hover:underline"
              >
                Edit
              </a>

              <DeleteTeacherButton id={teacher.id} />
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex gap-3 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <a
              key={i}
              href={`/school/teachers?page=${i + 1}&search=${search}`}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? "bg-purple-600"
                  : "bg-white/10"
              }`}
            >
              {i + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}