import { NextResponse } from 'next/server'

export function GET () {
  return NextResponse.json({ message: 'Get tasks' })
}

export async function POST (request) {
  const objData = await request.json()

  console.log("objData", objData)
  return NextResponse.json({ message: 'this is a post' })
}

export function PUT () {
  return NextResponse.json({ message: 'this is a put' })
}

export function DELETE () {
  return NextResponse.json({ message: 'this is a DELETE' })
}