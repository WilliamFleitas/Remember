import {
  ApiResponse,
  CreateRecordType,
  RecordType
} from '@/src/globalTypes/globalTypes'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export default async function createRecordCall ({
  title,
  description,
  importance_level,
  favorite
}: CreateRecordType): Promise<ApiResponse<RecordType>> {
  try {
    const response = await fetch(`${BASE_URL}/api/records`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        importance_level,
        favorite,
        categories: []
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data: ApiResponse<RecordType> = await response.json()

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
