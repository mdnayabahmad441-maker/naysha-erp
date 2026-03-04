import { prisma } from "@/lib/prisma";
import Card from "@/app/components/Card";
import DeleteClassButton from "@/app/components/DeleteClassButton";

export default async function ClassesPage({ searchParams }) {
  const user = { schoolId: 1 };

  const page = parseInt(searchParams?.page || "1");
  const search = searchParams?.search || "";
  const limit = 6;
  const skip = (page - 1) * limit;

  const classes = await prisma.class.findMany({
    where: {
      schoolId: user.schoolId,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      _count: {
        select: { students: true },
      },
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const totalClasses = await prisma.class.count({
    where: {
      schoolId: user.schoolId,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const totalPages = Math.ceil(totalClasses / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Classes Management
        </h1>

        <a
          href="/school/classes/new"
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600"
        >
          + Add Class
        </a>
      </div>

      <form className="mb-8">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search class..."
          className="w-full md:w-96 p-3 rounded bg-white/10 border border-white/20"
        />
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id}>
            <h3 className="text-xl font-semibold mb-2">
              {cls.name} {cls.section && `- ${cls.section}`}
            </h3>

            <p className="text-gray-400 mb-3">
              Students: {cls._count.students}
            </p>

            <div className="flex gap-6">
              <a
                href={`/school/classes/edit/${cls.id}`}
                className="text-cyan-400 hover:underline"
              >
                Edit
              </a>

              <DeleteClassButton
                id={cls.id}
                studentCount={cls._count.students}
              />
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex gap-3 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <a
              key={i}
              href={`/school/classes?page=${i + 1}&search=${search}`}
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