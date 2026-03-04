"use client";

import { useEffect,useState } from "react";

export default function PendingFees(){

const [fees,setFees] = useState([]);

useEffect(()=>{
loadFees();
},[]);

async function loadFees(){

const res = await fetch("/api/fees/pending");
const data = await res.json();

setFees(data);

}

return(

<div className="p-8 text-white">

<h1 className="text-3xl font-bold mb-6">
Pending Fees
</h1>

{fees.map(fee=>{

const pending = fee.totalAmount - fee.paidAmount;

return(

<div key={fee.id} className="bg-slate-700 p-4 rounded mt-4">

<p>Student: {fee.student.name}</p>

<p>Invoice: {fee.invoiceNumber}</p>

<p>Pending Amount: ₹{pending}</p>

</div>

);

})}

</div>

);

}