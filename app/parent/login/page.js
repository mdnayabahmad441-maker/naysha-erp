"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ParentLogin(){

const router = useRouter();

const [phone,setPhone] = useState("");
const [password,setPassword] = useState("");

async function login(e){

e.preventDefault();

const res = await fetch("/api/parent/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
phone,
password
})
});

if(res.ok){
router.push("/parent/dashboard");
}else{
alert("Login failed");
}

}

return(

<div className="min-h-screen flex items-center justify-center">

<form
onSubmit={login}
className="bg-slate-800 p-8 rounded w-96"
>

<h1 className="text-2xl mb-6 text-white">
Parent Login
</h1>

<input
placeholder="Phone"
className="w-full p-2 mb-4 text-black"
value={phone}
onChange={e=>setPhone(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="w-full p-2 mb-4 text-black"
value={password}
onChange={e=>setPassword(e.target.value)}
/>

<button
className="w-full bg-blue-600 py-2 rounded text-white"
>
Login
</button>

</form>

</div>

)

}