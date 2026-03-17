import { NextResponse } from "next/server"
import { updateOrderStatus } from "@/lib/orders/updateOrderStatus"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const { id, status } = body

    await updateOrderStatus(id, status)

    return NextResponse.json({ ok: true })

  } catch (error) {

    console.error(error)

    return NextResponse.json({ ok: false })

  }

}