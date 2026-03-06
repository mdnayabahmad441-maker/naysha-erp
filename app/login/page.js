"use client";

import { useState } from "react";

export default function Login(){

const [email,setEmail] = useState("");

async function sendLink(){

await fetch("/api/auth/send-magic-link",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({email})
});

alert("Magic link sent to email");

}

return(

<div>

<input
placeholder="School Email"
value={email}
onChange={e=>setEmail(e.target.value)}
/>

<button onClick={sendLink}>
Send Login Link
</button>

</div>

)

}