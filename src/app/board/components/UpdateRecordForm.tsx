'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import updateRecordCall from '@/src/libs/apiRequests/record/updateRecordCall'
import { RecordType } from '@/src/globalTypes/globalTypes'

const recordSchema = z.object({
  title: z.string().trim().min(5, 'Title is required, min 5 char').optional(),
  description: z
    .string()
    .trim()
    .min(5, 'Description is required, min 5 char')
    .optional(),
  importance_level: z
    .enum(['One', 'Two', 'Three', 'Four', 'Five'], {
      errorMap: () => ({
        message:
          'Importance level must be "One", "Two", "Three", "Four" or "Five"'
      })
    })
    .optional()
})

type RecordFormData = z.infer<typeof recordSchema>

interface UpdateRecordPropsType {
  recordData: RecordType
}
export default function UpdateRecordForm ({
  recordData
}: UpdateRecordPropsType) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RecordFormData>({
    resolver: zodResolver(recordSchema)
  })
  const watchedValues = watch()

  const isFormUnchanged =
    watchedValues.title?.trim() === recordData.title?.trim() &&
    watchedValues.description?.trim() === recordData.description?.trim() &&
    watchedValues.importance_level === recordData.importance_level

  const onSubmit = handleSubmit(async formData => {
    try {
      const recordObj: Partial<RecordFormData> = {}
      if (formData.title?.trim() !== recordData.title?.trim()) {
        recordObj.title = formData.title?.trim()
      }
      if (formData.description?.trim() !== recordData.description?.trim()) {
        recordObj.description = formData.description?.trim()
      }
      if (formData.importance_level !== recordData.importance_level) {
        recordObj.importance_level = formData.importance_level
      }


      if (Object.keys(recordObj).length === 0) return


      const response = await updateRecordCall({
        recordData: { id: recordData.id, ...recordObj }
      })

      if (!response.success) {
        throw Error(response.error)
      } else {
        console.log(
          'Record creado, hay que actualizar la lista de records',
          response
        )
        router.refresh()
      }
    } catch (error) {
      console.log('error', error)
    }
  })

  return (
    <div className='p-8 max-w-lg mx-auto '>
      <h2 className='text-xl font-semibold mb-6'>Update Record</h2>

      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <label htmlFor='title' className='block text-sm font-medium mb-2'>
            Title
          </label>
          <input
            id='title'
            type='text'
            defaultValue={recordData.title}
            className={`w-full p-2 border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
            {...register('title')}
          />
          {errors.title && (
            <span className='text-red-500 text-sm'>{errors.title.message}</span>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-sm font-medium mb-2'
          >
            Description
          </label>
          <textarea
            id='description'
            className={`w-full p-2 border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
            rows={4}
            defaultValue={recordData.description}
            {...register('description')}
          />
          {errors.description && (
            <span className='text-red-500 text-sm'>
              {errors.description.message}
            </span>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='importance_level'
            className='block text-sm font-medium mb-2'
          >
            Importance Level
          </label>
          <select
            id='importance_level'
            className={`w-full p-2 border ${
              errors.importance_level ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
            defaultValue={recordData.importance_level}
            {...register('importance_level')}
          >
            <option value='One'>One</option>
            <option value='Two'>Two</option>
            <option value='Three'>Three</option>
            <option value='Four'>Four</option>
            <option value='Five'>Five</option>
          </select>
          {errors.importance_level && (
            <span className='text-red-500 text-sm'>
              {errors.importance_level.message}
            </span>
          )}
        </div>

        <button
          type='submit'
          disabled={isFormUnchanged}
          className={`w-full p-2  text-white rounded-md  ${
            isFormUnchanged
              ? 'bg-zinc-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
