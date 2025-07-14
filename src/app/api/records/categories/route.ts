import { getRecordCategories } from "@/src/libs/server/getRecordCategories"
import { z } from 'zod'
import { prisma } from '@/src/libs/prisma'
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const categorySchema = z.object({
  name: z.string().min(5),
})
const deleteCategorySchema = z.object({
  id: z.string().cuid()
})
const updateCategorySchema = categorySchema.merge(deleteCategorySchema)

export async function GET (): Promise<Response> {
  try {
    const response = await getRecordCategories()

    if (!response.success) {
      throw Error(response.error)
    } else {
      return NextResponse.json(response, { status: 200 })
    }
  } catch (error: any) {
    console.error('Error getting record categories:', error)
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
    const parsed = categorySchema.safeParse(body)

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

    const { name } = parsed.data

    const { id } = await prisma.recordCategories.create({
      data: {
        name,
        userId: user.id
      }
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          name,
          id
        }
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating category:', error)
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
    const parsed = updateCategorySchema.safeParse(body)

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

    const result = await prisma.recordCategories.updateMany({
      where: {
        id: id,
        userId: user.id
      },
      data
    })

    if (result.count === 0) {
      return NextResponse.json(
        { success: false, error: 'There was an error Updating the Category' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: { message: 'The Category was Updated successfully' }
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
    const parsed = deleteCategorySchema.safeParse(body)
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