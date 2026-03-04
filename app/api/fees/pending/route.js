import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){

try{

const fees = await prisma.fee.findMany({
where:{
status:{not:"Paid"}
},
include:{
student:true
},
orderBy:{
createdAt:"desc"
}
});

return NextResponse.json(fees);

}catch(error){

console.error(error);

return NextResponse.json(
{error:"Failed"},
{status:500}
);

}

}