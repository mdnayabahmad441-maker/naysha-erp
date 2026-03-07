import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function POST(req){

  const session = await getServerSession(authOptions)

  const data = await req.json()

  const school = await prisma.school.create({
    data:{
      name:data.name,
      subdomain:data.subdomain,
      email:session.user.email
    }
  })

  await prisma.user.update({
    where:{ email:session.user.email },
    data:{ schoolId: school.id }
  })

  return NextResponse.json({ success:true })
}