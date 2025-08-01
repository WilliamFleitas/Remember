import { NextResponse } from 'next/server'
import { prisma } from '@/src/libs/prisma'
import { z } from 'zod'
import { currentUser } from '@clerk/nextjs/server'
import { getUserRecords } from '@/src/libs/server/getUserRecords'

const createRecordSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(5),
  favorite: z.boolean(),
  importance_level: z.enum(['One', 'Two', 'Three', 'Four', 'Five']),
  categories: z.array(z.string())
})
const deleteRecordSchema = z.object({
  id: z.string().cuid()
})
const updateRecordSchema = createRecordSchema
  .partial()
  .merge(deleteRecordSchema)

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
    const parsed = createRecordSchema.safeParse(body)

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

    const { title, description, importance_level, favorite, categories } = parsed.data

    const { id, createdAt } = await prisma.record.create({
      data: {
        title,
        description,
        importance_level,
        userId: user.id,
        favorite,
        categories
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
          id,
          favorite,
          categories
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

export async function PUT (req: Request): Promise<Response> {
  try {
    const user = await currentUser()
    if (!user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const parsed = updateRecordSchema.safeParse(body)

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

    const { id, ...data } = parsed.data

    const result = await prisma.record.updateMany({
      where: {
        id: id,
        userId: user.id
      },
      data
    })

    if (result.count === 0) {
      return NextResponse.json(
        { success: false, error: 'There was an error Updating the Record' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: { message: 'The record was Updated successfully' }
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || error },
      { status: 500 }
    )
  }
}

export async function DELETE (req: Request): Promise<Response> {
  try {
    const user = await currentUser()
    if (!user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const parsed = deleteRecordSchema.safeParse(body)
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

    const { id } = parsed.data

    const result = await prisma.record.deleteMany({
      where: {
        id,
        userId: user.id
      }
    })

    if (result.count === 0) {
      return NextResponse.json(
        { success: false, error: 'There was an error Deleting the Record' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: { message: 'The record was Deleted successfully' }
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || error },
      { status: 500 }
    )
  }
}
