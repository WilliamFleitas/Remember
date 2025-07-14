import { ApiResponse } from "@/src/globalTypes/globalTypes"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

interface DeleteRecordPropsType {
  id: string
}
export default async function deleteRecordCall ({
  id
}: DeleteRecordPropsType): Promise<ApiResponse<{message: string}>> {
  try {
    const response = await fetch(`${BASE_URL}/api/records`, {
      method: 'DELETE',
      body: JSON.stringify({
        id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data: ApiResponse<{message: string}> = await response.json()

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
