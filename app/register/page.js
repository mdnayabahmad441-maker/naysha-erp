"use client";

import { useState } from "react";

export default function RegisterPage() {

  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const [verified,setVerified] = useState(false);

  const [schoolName,setSchoolName] = useState("");
  const [adminName,setAdminName] = useState("");
  const [password,setPassword] = useState("");

  async function sendOtp(){

    const res = await fetch("/api/auth/send-otp",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email})
    });

    const data = await res.json();

    alert("OTP sent to email");

  }

  async function verifyOtp(){

    const res = await fetch("/api/auth/verify-otp",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,code:otp})
    });

    const data = await res.json();

    if(data.success){
      setVerified(true);
      alert("Email verified");
    }else{
      alert(data.error);
    }

  }

  async function createSchool(){

    const res = await fetch("/api/register-school",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        schoolName,
        adminName,
        email,
        password
      })
    });

    alert("School created");

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">

      <div className="bg-white/10 p-10 rounded-xl w-[420px]">

        <h1 className="text-2xl font-bold mb-6">
          Create School
        </h1>

        {!verified && (

          <>
          <input
          placeholder="Admin Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-white/10"
          />

          <button
          onClick={sendOtp}
          className="w-full mb-4 py-3 bg-cyan-500 rounded"
          >
          Send OTP
          </button>

          <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-white/10"
          />

          <button
          onClick={verifyOtp}
          className="w-full py-3 bg-green-500 rounded"
          >
          Verify OTP
          </button>

          </>
        )}

        {verified && (

          <>
          <input
          placeholder="School Name"
          value={schoolName}
          onChange={(e)=>setSchoolName(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-white/10"
          />

          <input
          placeholder="Admin Name"
          value={adminName}
          onChange={(e)=>setAdminName(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-white/10"
          />

          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-white/10"
          />

          <button
          onClick={createSchool}
          className="w-full py-3 bg-purple-600 rounded"
          >
          Create School
          </button>

          </>
        )}

      </div>

    </div>

  );

}