import { ApiResponse, RecordType } from "@/src/app/globalTypes/globalTypes"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export default async function getRecordsCall (): Promise<
  ApiResponse<RecordType[] | []>
> {
  try {
    const response = await fetch(`${BASE_URL}/api/records`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    const data: ApiResponse<RecordType[] | []> = await response.json()
    console.log("asdasd", data)
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
