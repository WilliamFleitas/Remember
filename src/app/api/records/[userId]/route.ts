import { NextResponse } from 'next/server'

export async function GET (request, { params }) {
  const params1 = await params
  const url = new URL(request.url)
  const filter = url.searchParams.get('filter')
  console.log('res', params1.userId, filter)
  return NextResponse.json({ message: 'next userid' })
}
