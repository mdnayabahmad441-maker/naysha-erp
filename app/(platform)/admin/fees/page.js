import prisma from "@/lib/prisma"

export default async function FeesPage(){

const fees = await prisma.fee.findMany({
include:{ student:true }
})

return(

<div>

<h1 className="text-3xl font-bold mb-6">
Fees
</h1>

<table className="w-full bg-black/40 rounded-xl">

<thead className="bg-black/60">

<tr>
<th className="p-4 text-left">Student</th>
<th className="p-4 text-left">Total</th>
<th className="p-4 text-left">Paid</th>
<th className="p-4 text-left">Status</th>
</tr>

</thead>

<tbody>

{fees.map((f)=>(
<tr key={f.id} className="border-t border-white/10">

<td className="p-4">{f.student.name}</td>
<td className="p-4">₹{f.totalAmount}</td>
<td className="p-4">₹{f.paidAmount}</td>
<td className="p-4">{f.status}</td>

</tr>
))}

</tbody>

</table>

</div>

)
}