"use client";

import { useEffect,useState } from "react";
import { useParams } from "next/navigation";

export default function InvoicePage(){

const {id} = useParams();

const [invoice,setInvoice] = useState(null);


useEffect(()=>{
  loadInvoice();
},[]);


async function loadInvoice(){

  const res = await fetch(`/api/invoice/${id}`);
  const data = await res.json();

  setInvoice(data);

}


function printInvoice(){
  window.print();
}


if(!invoice) return <p>Loading...</p>;

return(

<div className="p-10 bg-white text-black min-h-screen">

<h1 className="text-3xl font-bold mb-6">
Fee Invoice
</h1>

<p><b>Invoice:</b> {invoice.invoiceNumber}</p>
<p><b>Student:</b> {invoice.student?.name}</p>
<p><b>Roll:</b> {invoice.student?.rollNumber}</p>

<hr className="my-4"/>

<p>School Fee: ₹{invoice.schoolFee}</p>
<p>Hostel Fee: ₹{invoice.hostelFee}</p>
<p>Transport Fee: ₹{invoice.transportFee}</p>
<p>Misc Fee: ₹{invoice.miscFee}</p>
<p>Other Charges: ₹{invoice.otherCharges}</p>

<hr className="my-4"/>

<p className="text-lg"><b>Total:</b> ₹{invoice.totalAmount}</p>
<p><b>Paid:</b> ₹{invoice.paidAmount}</p>
<p><b>Status:</b> {invoice.status}</p>

<button
onClick={printInvoice}
className="bg-blue-600 text-white px-4 py-2 mt-6 rounded"
>
Print / Download
</button>

</div>

);

}