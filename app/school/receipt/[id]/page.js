"use client";

import { useParams } from "next/navigation";
import { useEffect,useState } from "react";

export default function ReceiptPage(){

const {id} = useParams();

const [data,setData] = useState(null);

useEffect(()=>{
loadReceipt();
},[]);

async function loadReceipt(){

const res = await fetch(`/api/payments/${id}`);
const result = await res.json();

setData(result);

}

function printReceipt(){
window.print();
}

if(!data) return <p className="p-8">Loading...</p>;

return(

<div className="p-10 bg-white text-black max-w-xl mx-auto">

<h1 className="text-2xl font-bold mb-6">
Payment Receipt
</h1>

<p><b>Receipt No:</b> RC-{data.id}</p>

<p><b>Student:</b> {data.student?.name}</p>

<p><b>Invoice:</b> {data.fee?.invoiceNumber}</p>

<p><b>Amount Paid:</b> ₹{data.amount}</p>

<p><b>Date:</b> {new Date(data.createdAt).toLocaleDateString()}</p>

<button
onClick={printReceipt}
className="bg-blue-600 text-white px-4 py-2 mt-6 rounded"
>
Print Receipt
</button>

</div>

);

}