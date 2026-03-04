"use client";

import { useEffect,useState } from "react";

export default function FeeDashboard(){

const [stats,setStats] = useState({});

useEffect(()=>{
loadStats();
},[]);

async function loadStats(){

const res = await fetch("/api/fees/stats");
const data = await res.json();

setStats(data);

}

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-8">
Fee Analytics
</h1>

<div className="grid grid-cols-3 gap-6">

<div className="bg-slate-700 p-6 rounded">
<p>Total Fees</p>
<h2 className="text-2xl">₹{stats.totalFees}</h2>
</div>

<div className="bg-green-700 p-6 rounded">
<p>Collected</p>
<h2 className="text-2xl">₹{stats.collected}</h2>
</div>

<div className="bg-red-700 p-6 rounded">
<p>Pending</p>
<h2 className="text-2xl">₹{stats.pending}</h2>
</div>

</div>

</div>

);

}