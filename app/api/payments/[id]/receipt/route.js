import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req,{params}){

const id = Number(params.id);

try{

const payment = await prisma.payment.findUnique({
where:{id},
include:{
fee:{
include:{
student:true
}
}
}
});

return NextResponse.json(payment);

}catch(error){

console.error(error);

return NextResponse.json(
{error:"Failed to load receipt"},
{status:500}
);

}

}