"use client";

import { useEffect, useState } from "react";

export default function ParentFeesPage(){

const [fees,setFees] = useState([]);

useEffect(()=>{
loadFees();
},[]);

async function loadFees(){

const res = await fetch("/api/parent/fees");
const data = await res.json();

setFees(data);

}

return(

<div className="p-10 text-white">

<h1 className="text-3xl font-bold mb-6">
My Fees
</h1>

{fees.map(f=>(
<div key={f.id} className="bg-slate-700 p-4 mb-4 rounded">

<p>Invoice: {f.invoiceNumber}</p>

<p>Total: ₹{f.totalAmount}</p>

<p>Paid: ₹{f.paidAmount}</p>

<p>Status: {f.status}</p>

<a
href={`/school/invoice/${f.id}`}
className="bg-purple-600 px-3 py-1 rounded inline-block mt-2"
>
Download Invoice
</a>

</div>
))}

</div>

);

}