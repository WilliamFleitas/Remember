'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/src/libs/prisma'
import { ApiResponse, RecordType } from '@/src/app/globalTypes/globalTypes'

export async function getUserRecords (): Promise<
  ApiResponse<RecordType[] | []>
> {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error('Unauthorized')
    }

    const records = await prisma.record.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        importance_level: true,
        createdAt: true
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
