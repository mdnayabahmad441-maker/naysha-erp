"use client";

import { useState,useEffect } from "react";

export default function StudentSelector({ classes, onSelect }){

  const [classId,setClassId] = useState("");
  const [students,setStudents] = useState([]);
  const [search,setSearch] = useState("");

  async function loadStudents(id){

    const res = await fetch(`/api/students/by-class/${id}`);
    const data = await res.json();

    setStudents(data);
  }

  function handleClassChange(e){

    const id = e.target.value;

    setClassId(id);

    if(id){
      loadStudents(id);
    }

  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return(

    <div className="space-y-3">

      {/* CLASS SELECT */}
      <select
      className="w-full p-2 border rounded text-black"
      value={classId}
      onChange={handleClassChange}
      >
        <option value="">Select Class</option>

        {classes.map(cls=>(
          <option key={cls.id} value={cls.id}>
            {cls.name}
          </option>
        ))}

      </select>


      {/* SEARCH */}
      <input
      className="w-full p-2 border rounded text-black"
      placeholder="Search student..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />


      {/* STUDENT LIST */}
      <div className="max-h-48 overflow-y-auto border rounded">

        {filteredStudents.map(student=>(
          <div
          key={student.id}
          className="p-2 hover:bg-blue-100 cursor-pointer"
          onClick={()=>onSelect(student)}
          >
            {student.name} ({student.rollNumber || "-"})
          </div>
        ))}

      </div>

    </div>

  );

}