import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-500">
          EduGrowth ERP
        </h2>

        <div className="space-y-4">
          <Link
            href="/admin/students"
            className="block p-2 rounded hover:bg-slate-800"
          >
            Manage Students
          </Link>

          <Link
            href="/admin/teachers"
            className="block p-2 rounded hover:bg-slate-800"
          >
            Manage Teachers
          </Link>
        </div>
      </aside>
<li>
  <a href="/admin/classes">Manage Classes</a>
</li>
      {/* Main Content */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}