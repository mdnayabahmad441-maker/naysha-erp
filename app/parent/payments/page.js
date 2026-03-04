"use client";

import { useEffect, useState } from "react";

export default function ParentPayments(){

const [payments,setPayments] = useState([]);

useEffect(()=>{
loadPayments();
},[]);

async function loadPayments(){

const res = await fetch("/api/parent/payments");
const data = await res.json();

setPayments(data);

}

return(

<div className="p-10 text-white">

<h1 className="text-3xl font-bold mb-6">
Payment History
</h1>

{payments.map(p=>(
<div key={p.id} className="bg-slate-700 p-4 mb-4 rounded">

<p>Amount: ₹{p.amount}</p>

<p>Date: {new Date(p.createdAt).toLocaleDateString()}</p>

<a
href={`/school/receipt/${p.id}`}
className="bg-blue-600 px-3 py-1 rounded inline-block mt-2"
>
Download Receipt
</a>

</div>
))}

</div>

);

}