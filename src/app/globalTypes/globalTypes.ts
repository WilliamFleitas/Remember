export type ImportanceLevelType = 'One' | 'Two' | 'Three' | 'Four' | 'Five'

export interface RecordType {
  title: string
  description: string
  importance_level: ImportanceLevelType
  id: string
  createdAt: Date
}
export type CreateRecordProps = Omit<RecordType, 'id' | "createdAt">

export type ApiResponse<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: string
    }
