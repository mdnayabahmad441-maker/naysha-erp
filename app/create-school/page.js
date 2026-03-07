"use client"

import { useState } from "react"

export default function CreateSchool() {

  const [name, setName] = useState("")
  const [subdomain, setSubdomain] = useState("")

  const createSchool = async () => {

    await fetch("/api/create-school", {
      method: "POST",
      body: JSON.stringify({
        name,
        subdomain
      })
    })

    window.location.href = "/school/dashboard"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">

      <div className="bg-black/60 p-10 rounded-xl w-[420px]">

        <h1 className="text-2xl font-bold mb-6">
          Create Your School
        </h1>

        <input
          placeholder="School Name"
          className="w-full mb-4 p-3 rounded text-black"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Subdomain (example: greenvalley)"
          className="w-full mb-6 p-3 rounded text-black"
          onChange={(e)=>setSubdomain(e.target.value)}
        />

        <button
          onClick={createSchool}
          className="w-full bg-purple-600 py-3 rounded-lg"
        >
          Create School
        </button>

      </div>
    </div>
  )
}