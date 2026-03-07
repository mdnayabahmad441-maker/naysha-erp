import prisma from "@/lib/prisma"

export default async function TeacherPage(){

const teachers = await prisma.teacher.findMany()

return(

<div>

<h1 className="text-3xl font-bold mb-6">
Teachers
</h1>

<table className="w-full bg-black/40 rounded-xl">

<thead className="bg-black/60">

<tr>
<th className="p-4 text-left">Name</th>
<th className="p-4 text-left">Email</th>
<th className="p-4 text-left">Phone</th>
</tr>

</thead>

<tbody>

{teachers.map((t)=>(
<tr key={t.id} className="border-t border-white/10">

<td className="p-4">{t.name}</td>
<td className="p-4">{t.email}</td>
<td className="p-4">{t.phone}</td>

</tr>
))}

</tbody>

</table>

</div>

)
}