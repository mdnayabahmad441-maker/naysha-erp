"use client";

import { useEffect, useState } from "react";

export default function FeesPage() {

const [classes,setClasses]=useState([]);
const [students,setStudents]=useState([]);
const [selectedClass,setSelectedClass]=useState("");
const [studentId,setStudentId]=useState("");

const [schoolFee,setSchoolFee]=useState(0);
const [hostelFee,setHostelFee]=useState(0);
const [transportFee,setTransportFee]=useState(0);
const [miscFee,setMiscFee]=useState(0);
const [otherCharges,setOtherCharges]=useState(0);

const [total,setTotal]=useState(0);

const [bills,setBills]=useState([]);

useEffect(()=>{
fetch("/api/classes")
.then(res=>res.json())
.then(data=>setClasses(data));
},[]);

useEffect(()=>{

if(!selectedClass) return;

fetch(`/api/students/by-class?classId=${selectedClass}`)
.then(res=>res.json())
.then(data=>setStudents(data));

},[selectedClass]);

useEffect(()=>{

const t =
Number(schoolFee)+
Number(hostelFee)+
Number(transportFee)+
Number(miscFee)+
Number(otherCharges);

setTotal(t);

},[schoolFee,hostelFee,transportFee,miscFee,otherCharges]);

async function generateBill(){

const res = await fetch("/api/fees",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
studentId:Number(studentId),
schoolFee:Number(schoolFee),
hostelFee:Number(hostelFee),
transportFee:Number(transportFee),
miscFee:Number(miscFee),
otherCharges:Number(otherCharges),
totalAmount:Number(total)
})
});

if(res.ok){
alert("Bill Generated");
loadBills();
}else{
alert("Error generating bill");
}

}

async function loadBills(){
const res = await fetch("/api/fees");
const data = await res.json();
setBills(data);
}

useEffect(()=>{
loadBills();
},[]);



/* MONTHLY FEE GENERATION */

async function generateMonthly(){

const month = prompt("Enter month (example: April)");

if(!month) return;

const res = await fetch("/api/fees/generate-monthly",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({month})
});

const data = await res.json();

if(res.ok){
alert(`Generated ${data.total} bills`);
loadBills();
}else{
alert("Error generating monthly fees");
}

}



return (

<div className="p-8 text-white">

<h1 className="text-3xl font-bold mb-6">
Fees Management
</h1>

{/* MONTHLY GENERATION BUTTON */}

<button
onClick={generateMonthly}
className="bg-green-600 px-4 py-2 rounded mb-6"
>
Generate Monthly Fees
</button>

<div className="bg-slate-700 p-6 rounded w-[500px]">

<h2 className="text-xl mb-4">
Generate Bill
</h2>

<select
className="w-full mb-3 p-2 text-black"
value={selectedClass}
onChange={e=>setSelectedClass(e.target.value)}
>
<option value="">Select Class</option>

{classes.map(c=>(
<option key={c.id} value={c.id}>
{c.name}
</option>
))}

</select>

<select
className="w-full mb-3 p-2 text-black"
value={studentId}
onChange={e=>setStudentId(e.target.value)}
>
<option value="">Select Student</option>

{students.map(s=>(
<option key={s.id} value={s.id}>
{s.name} ({s.rollNumber})
</option>
))}

</select>

{/* SCHOOL FEE */}

<label>School Fee</label>

<input
type="number"
className="w-full mb-3 p-2 text-black"
value={schoolFee}
onChange={e=>setSchoolFee(e.target.value)}
/>

{/* HOSTEL FEE */}

<label>Hostel Fee</label>

<input
type="number"
className="w-full mb-3 p-2 text-black"
value={hostelFee}
onChange={e=>setHostelFee(e.target.value)}
/>

{/* TRANSPORT */}

<label>Transport Fee</label>

<input
type="number"
className="w-full mb-3 p-2 text-black"
value={transportFee}
onChange={e=>setTransportFee(e.target.value)}
/>

{/* MISC */}

<label>Misc Fee</label>

<input
type="number"
className="w-full mb-3 p-2 text-black"
value={miscFee}
onChange={e=>setMiscFee(e.target.value)}
/>

{/* OTHER */}

<label>Other Charges</label>

<input
type="number"
className="w-full mb-3 p-2 text-black"
value={otherCharges}
onChange={e=>setOtherCharges(e.target.value)}
/>

<p className="mt-3 font-bold">
Total: ₹ {total}
</p>

<button
onClick={generateBill}
className="mt-4 bg-blue-600 px-4 py-2 rounded"
>
Generate Bill
</button>

</div>

{/* BILL LIST */}

<h2 className="mt-10 text-xl">
Bills
</h2>

{bills.map(bill=>(
<div key={bill.id} className="bg-slate-700 p-4 mt-4 rounded">

<p>Student: {bill.student?.name}</p>

<p>Invoice: {bill.invoiceNumber}</p>

<p>Total: ₹{bill.totalAmount}</p>

<p>Paid: ₹{bill.paidAmount}</p>

<p>Status: {bill.status}</p>

<a
href={`/school/invoice/${bill.id}`}
className="bg-purple-600 px-3 py-1 rounded inline-block mt-2"
>
Download Invoice
</a>

</div>
))}

</div>

);

}