"use client";

import { useEffect, useState } from "react";

export default function ParentDashboard() {

const [data,setData] = useState(null);

useEffect(()=>{
loadData();
},[]);

async function loadData(){

const res = await fetch("/api/parent/dashboard");
const d = await res.json();

setData(d);

}

if(!data) return <p className="p-10">Loading...</p>;

return(

<div className="p-10 text-white">

<h1 className="text-3xl font-bold mb-8">
Parent Dashboard
</h1>

<div className="grid grid-cols-3 gap-6">

<div className="bg-slate-700 p-6 rounded">
<p>Student</p>
<h2 className="text-xl">{data.student.name}</h2>
</div>

<div className="bg-slate-700 p-6 rounded">
<p>Class</p>
<h2 className="text-xl">{data.student.class?.name}</h2>
</div>

<div className="bg-slate-700 p-6 rounded">
<p>Pending Fees</p>
<h2 className="text-xl">₹{data.pendingFees}</h2>
</div>

</div>

<h2 className="text-xl mt-10 mb-4">
Recent Payments
</h2>

{data.payments.map(p=>(
<div key={p.id} className="bg-slate-700 p-4 mb-3 rounded">

<p>Amount: ₹{p.amount}</p>

<p>Date: {new Date(p.createdAt).toLocaleDateString()}</p>

</div>
))}

</div>

);

}