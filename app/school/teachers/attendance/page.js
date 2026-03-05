"use client";

import { useEffect, useState } from "react";

export default function TeacherAttendance() {

  const [students,setStudents] = useState([]);
  const [attendance,setAttendance] = useState({});

  useEffect(()=>{
    loadStudents();
  },[]);

  async function loadStudents(){

    const res = await fetch("/api/teacher/students");
    const data = await res.json();

    setStudents(data);

  }

  function toggle(studentId,status){

    setAttendance(prev=>({
      ...prev,
      [studentId]:status
    }));

  }

  async function saveAttendance(){

    const res = await fetch("/api/attendance",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        records:attendance
      })
    });

    if(res.ok){
      alert("Attendance saved");
    }

  }

  return(

<div className="p-8 text-white">

<h1 className="text-3xl font-bold mb-8">
Mark Attendance
</h1>

<div className="space-y-4">

{students.map(student=>(

<div key={student.id}
className="flex justify-between bg-slate-700 p-4 rounded">

<span>
{student.name}
</span>

<div className="space-x-2">

<button
onClick={()=>toggle(student.id,"PRESENT")}
className="bg-green-600 px-3 py-1 rounded"
>
Present
</button>

<button
onClick={()=>toggle(student.id,"ABSENT")}
className="bg-red-600 px-3 py-1 rounded"
>
Absent
</button>

</div>

</div>

))}

</div>

<button
onClick={saveAttendance}
className="mt-6 bg-purple-600 px-6 py-2 rounded"
>
Save Attendance
</button>

</div>

)

}