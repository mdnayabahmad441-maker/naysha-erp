import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req,{params}){

const id = Number(params.id);

const payment = await prisma.payment.findUnique({

where:{id},

include:{
fee:true,
student:true
}

});

return NextResponse.json(payment);

}