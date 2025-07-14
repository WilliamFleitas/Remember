export type ImportanceLevelType = 'One' | 'Two' | 'Three' | 'Four' | 'Five'

export interface RecordType {
  title: string
  description: string
  importance_level: ImportanceLevelType
  id: string
  createdAt: Date
  favorite: boolean
  categories: string[]
}
export type CreateRecordType = Omit<RecordType, 'id' | 'createdAt' | 'categories'>


export interface RecordCategoryType {
  id: string
  name: string
}
export type CreateCategoryType = Omit<RecordCategoryType, 'id'>


export type ApiResponse<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: string
    }
