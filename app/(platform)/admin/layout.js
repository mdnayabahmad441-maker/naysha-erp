import Link from "next/link";

export default function AdminLayout({ children }) {

return (

<div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">

{/* SIDEBAR */}

<div className="w-64 bg-black/40 backdrop-blur-lg p-6">

<h1 className="text-2xl font-bold mb-10">
EduGrowth ERP
</h1>

<div className="flex flex-col gap-4">

<Link
href="/admin/students"
className="hover:bg-purple-600 p-3 rounded-lg transition">
Manage Students
</Link>

<Link
href="/admin/teacher"
className="hover:bg-purple-600 p-3 rounded-lg transition">
Manage Teachers
</Link>

<Link
href="/admin/attendance"
className="hover:bg-purple-600 p-3 rounded-lg transition">
Attendance
</Link>

<Link
href="/admin/fees"
className="hover:bg-purple-600 p-3 rounded-lg transition">
Fees
</Link>

</div>

</div>

{/* MAIN CONTENT */}

<div className="flex-1 p-10">
{children}
</div>

</div>

)
}