'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/src/libs/prisma'
import { ApiResponse, RecordCategoryType } from '@/src/globalTypes/globalTypes'

export async function getRecordCategories (): Promise<
  ApiResponse<RecordCategoryType[] | []>
> {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error('Unauthorized')
    }

    const categories = await prisma.recordCategories.findMany({
      where: { userId },
      select: {
        id: true,
        name: true
      }
    })

    return {
      success: true,
      data: categories
    }
  } catch (error: any) {
    console.error('Error getting records:', error)
    return {
      success: false,
      error: error.message || error
    }
  }
}
