'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/src/libs/prisma'
import { ApiResponse, RecordType } from '@/src/globalTypes/globalTypes'

interface GetUserRecordsType {
  categoryId?: string
  favorite?: boolean
}
export async function getUserRecords ({
  categoryId,
  favorite
}: GetUserRecordsType = {}): Promise<ApiResponse<RecordType[] | []>> {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error('Unauthorized')
    }

    const whereObj: {
      userId: string
      categories?: {
        has: string
      }
      favorite?: boolean
    } = { userId: userId }

    if (categoryId !== undefined && categoryId.length) {
      whereObj.categories = { has: categoryId }
    }
    if (favorite !== undefined && favorite) {
      whereObj.favorite = true
    }
    const records = await prisma.record.findMany({
      where: whereObj,
      select: {
        id: true,
        title: true,
        description: true,
        importance_level: true,
        createdAt: true,
        favorite: true,
        categories: true
      }
    })

    return {
      success: true,
      data: records
    }
  } catch (error: any) {
    console.error('Error getting records:', error)
    return {
      success: false,
      error: error.message || error
    }
  }
}
