"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentsPage() {

  const [students,setStudents] = useState([]);
  const [classes,setClasses] = useState([]);
  const [selectedClass,setSelectedClass] = useState("");



  /* FETCH CLASSES */
  useEffect(()=>{

    fetch("/api/classes")
      .then(res=>res.json())
      .then(data=>setClasses(data));

  },[]);



  /* FETCH STUDENTS */
  useEffect(()=>{

    let url="/api/students";

    if(selectedClass){
      url=`/api/students?classId=${selectedClass}`;
    }

    fetch(url)
      .then(res=>res.json())
      .then(data=>setStudents(data));

  },[selectedClass]);



  return(

    <div className="p-10">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">Students</h1>

        <Link
          href="/school/students/new"
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Add Student
        </Link>

      </div>



      {/* CLASS FILTER */}

      <select
        className="mb-6 p-2 text-black rounded"
        value={selectedClass}
        onChange={(e)=>setSelectedClass(e.target.value)}
      >

        <option value="">All Students</option>

        {classes.map(c=>(
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}

      </select>



      {/* STUDENT LIST */}

      <div className="space-y-4">

        {students.map(student=>(

          <div key={student.id} className="bg-white/10 p-5 rounded-xl">

            <h2 className="text-xl font-semibold">
              {student.name}
            </h2>

            <p>Roll: {student.rollNumber || "-"}</p>

            <p>Phone: {student.phone || "-"}</p>

            <p>Email: {student.email || "-"}</p>

            <p>
              Class: {student.class?.name || "-"}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}