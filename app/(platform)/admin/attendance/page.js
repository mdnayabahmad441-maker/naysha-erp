import prisma from "@/lib/prisma"

export default async function AttendancePage(){

const attendance = await prisma.attendance.findMany({
include:{ student:true }
})

return(

<div>

<h1 className="text-3xl font-bold mb-6">
Attendance
</h1>

<table className="w-full bg-black/40 rounded-xl">

<thead className="bg-black/60">

<tr>
<th className="p-4 text-left">Student</th>
<th className="p-4 text-left">Date</th>
<th className="p-4 text-left">Status</th>
</tr>

</thead>

<tbody>

{attendance.map((a)=>(
<tr key={a.id} className="border-t border-white/10">

<td className="p-4">{a.student.name}</td>
<td className="p-4">{new Date(a.date).toDateString()}</td>
<td className="p-4">{a.status}</td>

</tr>
))}

</tbody>

</table>

</div>

)
}