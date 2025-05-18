import { NextResponse } from 'next/server'
import { prisma } from '@/src/libs/prisma'
import { z } from 'zod'
import { currentUser } from '@clerk/nextjs/server'
import { getUserRecords } from '@/src/libs/server/getUserRecords'

const recordSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  importance_level: z.enum(['One', 'Two', 'Three', 'Four', 'Five']).optional()
})

export async function GET (): Promise<Response> {
  try {
    const response = await getUserRecords()

    if (!response.success) {
      throw Error(response.error)
    } else {
      return NextResponse.json(response, { status: 200 })
    }
  } catch (error: any) {
    console.error('Error getting records:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || error
      },
      { status: 500 }
    )
  }
}

export async function POST (req: Request): Promise<Response> {
  try {
    const user = await currentUser()

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized'
        },
        { status: 401 }
      )
    }
    const body = await req.json()
    const parsed = recordSchema.safeParse(body)

    if (!parsed.success) {
      const errorData = parsed.error?.errors[0]
      const errorMessage = `${
        errorData.path[0]
      } ${errorData.message.toLowerCase()}`.toLowerCase()
      return NextResponse.json(
        {
          success: false,
          error: errorMessage
        },
        { status: 400 }
      )
    }

    const { title, description, importance_level } = parsed.data

    const { id, createdAt } = await prisma.record.create({
      data: {
        title,
        description,
        importance_level,
        userId: user.id
      }
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          title,
          description,
          importance_level,
          createdAt,
          id
        }
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating record:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || error
      },
      { status: 500 }
    )
  }
}

export function PUT () {
  return NextResponse.json({ message: 'this is a put' })
}

export function DELETE () {
  return NextResponse.json({ message: 'this is a DELETE' })
}
