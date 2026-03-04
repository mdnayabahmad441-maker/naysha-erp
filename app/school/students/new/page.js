"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddStudentPage(){

  const router = useRouter();

  const [name,setName] = useState("");
  const [rollNumber,setRollNumber] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [classId,setClassId] = useState("");

  const [classes,setClasses] = useState([]);

  async function loadClasses(){

    const res = await fetch("/api/classes");

    const data = await res.json();

    setClasses(data);
  }

  useEffect(()=>{
    loadClasses();
  },[]);


  async function handleSubmit(e){

    e.preventDefault();

    const res = await fetch("/api/students",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        rollNumber,
        phone,
        email,
        classId
      })
    });

    if(res.ok){
      router.push("/school/students");
      router.refresh();
    }else{
      alert("Failed to create student");
    }
  }


  return(

    <div className="p-10 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Add Student
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
        className="w-full p-2 border rounded text-black"
        placeholder="Student Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
        />

        <input
        className="w-full p-2 border rounded text-black"
        placeholder="Roll Number"
        value={rollNumber}
        onChange={(e)=>setRollNumber(e.target.value)}
        />

        <input
        className="w-full p-2 border rounded text-black"
        placeholder="Phone"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
        />

        <input
        className="w-full p-2 border rounded text-black"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <select
        className="w-full p-2 border rounded text-black"
        value={classId}
        onChange={(e)=>setClassId(e.target.value)}
        required
        >
          <option value="">Select Class</option>

          {classes.map(cls=>(
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}

        </select>

        <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Student
        </button>

      </form>

    </div>

  )
}