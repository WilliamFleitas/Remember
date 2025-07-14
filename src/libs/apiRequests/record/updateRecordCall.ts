import {
  ApiResponse,
  RecordType
} from '@/src/globalTypes/globalTypes'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'


type UpdateRecordType = Omit<Partial<RecordType>, 'createdAt'> & {
    id: string
}

interface UpdateRecordPropsType {
  recordData: UpdateRecordType
}

export default async function updateRecordCall ({
  recordData
}: UpdateRecordPropsType): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(`${BASE_URL}/api/records`, {
      method: 'PUT',
      body: JSON.stringify(recordData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data: ApiResponse<{ message: string }> = await response.json()

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
