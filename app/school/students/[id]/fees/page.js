"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentFeesPage(){

const {id} = useParams();

const [fees,setFees] = useState([]);
const [student,setStudent] = useState(null);

useEffect(()=>{
loadData();
},[]);


async function loadData(){

const res = await fetch(`/api/students/${id}/fees`);
const data = await res.json();

setStudent(data.student);
setFees(data.fees);

}

if(!student) return <p>Loading...</p>;

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Fee Ledger
</h1>

<p className="mb-6">
Student: {student.name}
</p>

<table className="w-full border">

<thead>
<tr className="bg-slate-700 text-white">
<th className="p-2">Invoice</th>
<th>Total</th>
<th>Paid</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{fees.map(fee=>(
<tr key={fee.id} className="border">

<td className="p-2">{fee.invoiceNumber}</td>
<td>₹{fee.totalAmount}</td>
<td>₹{fee.paidAmount}</td>
<td>{fee.status}</td>

</tr>
))}

</tbody>

</table>

</div>

);

}