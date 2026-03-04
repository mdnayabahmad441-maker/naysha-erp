import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req,{params}){

  try{

    const id = Number(params.id);

    const fee = await prisma.fee.findUnique({
      where:{ id },
      include:{
        student:true
      }
    });

    if(!fee){
      return NextResponse.json({error:"Invoice not found"},{status:404});
    }

    return NextResponse.json(fee);

  }catch(error){

    console.error("Invoice error:",error);

    return NextResponse.json(
      {error:"Failed"},
      {status:500}
    );

  }

}