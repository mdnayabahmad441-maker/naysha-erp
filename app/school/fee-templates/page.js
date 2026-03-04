"use client";

import { useEffect, useState } from "react";

export default function FeeTemplatesPage(){

const [classes,setClasses]=useState([]);
const [classId,setClassId]=useState("");
const [studentType,setStudentType]=useState("DayScholar");

const [schoolFee,setSchoolFee]=useState("");
const [transportFee,setTransportFee]=useState("");
const [hostelFee,setHostelFee]=useState("");
const [miscFee,setMiscFee]=useState("");

useEffect(()=>{
fetch("/api/classes")
.then(res=>res.json())
.then(data=>setClasses(data));
},[]);


async function saveTemplate(){

const res = await fetch("/api/fee-templates",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
classId,
studentType,
schoolFee,
transportFee,
hostelFee,
miscFee
})
});

if(res.ok){
alert("Template saved");
}else{
alert("Error saving template");
}

}


return(

<div className="p-10 max-w-xl">

<h1 className="text-2xl font-bold mb-6">
Fee Templates
</h1>

<select
className="w-full p-2 border rounded text-black mb-4"
value={classId}
onChange={(e)=>setClassId(e.target.value)}
>

<option value="">
Select Class
</option>

{classes.map(c=>(
<option key={c.id} value={c.id}>
{c.name}
</option>
))}

</select>


<select
className="w-full p-2 border rounded text-black mb-4"
value={studentType}
onChange={(e)=>setStudentType(e.target.value)}
>

<option value="DayScholar">
Day Scholar
</option>

<option value="Hosteler">
Hosteler
</option>

</select>


<input
placeholder="School Fee"
className="w-full p-2 border rounded text-black mb-3"
value={schoolFee}
onChange={(e)=>setSchoolFee(e.target.value)}
/>


{studentType === "DayScholar" && (

<input
placeholder="Transport Fee"
className="w-full p-2 border rounded text-black mb-3"
value={transportFee}
onChange={(e)=>setTransportFee(e.target.value)}
/>

)}


{studentType === "Hosteler" && (

<input
placeholder="Hostel Fee"
className="w-full p-2 border rounded text-black mb-3"
value={hostelFee}
onChange={(e)=>setHostelFee(e.target.value)}
/>

)}


<input
placeholder="Misc Fee"
className="w-full p-2 border rounded text-black mb-3"
value={miscFee}
onChange={(e)=>setMiscFee(e.target.value)}
/>


<button
onClick={saveTemplate}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Save Template
</button>

</div>

);

}