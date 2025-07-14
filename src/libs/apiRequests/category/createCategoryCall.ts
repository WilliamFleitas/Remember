import {
  ApiResponse,
  CreateCategoryType,
  RecordCategoryType
} from '@/src/globalTypes/globalTypes'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export default async function createCategoryCall ({
  name
}: CreateCategoryType): Promise<ApiResponse<RecordCategoryType>> {
  try {
    const response = await fetch(`${BASE_URL}/api/records/categories`, {
      method: 'POST',
      body: JSON.stringify({
        name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data: ApiResponse<RecordCategoryType> = await response.json()

    if (!data.success) {
      throw Error(data.error)
    } else {
      return data
    }
  } catch (error: any) {
    console.log('error', error)
    return {
      success: false,
      error: error.message || error
    }
  }
}
