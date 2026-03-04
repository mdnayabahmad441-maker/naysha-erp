"use client";

import { useEffect,useState } from "react";

export default function ParentAttendance(){

const [records,setRecords] = useState([]);

useEffect(()=>{
loadAttendance();
},[]);

async function loadAttendance(){

const res = await fetch("/api/parent/attendance");
const data = await res.json();

setRecords(data);

}

return(

<div className="p-10 text-white">

<h1 className="text-3xl font-bold mb-6">
Attendance
</h1>

{records.map(a=>(
<div key={a.id} className="bg-slate-700 p-4 mb-3 rounded">

<p>Date: {new Date(a.date).toLocaleDateString()}</p>

<p>Status: {a.status}</p>

</div>
))}

</div>

);

}