'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const recordSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  importance_level: z.enum(['One', 'Two', 'Three'], {
    errorMap: () => ({
      message: 'Importance level must be "One", "Two", or "Three"'
    })
  })
})

type RecordFormData = z.infer<typeof recordSchema>

export default function CreateRecordForm () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RecordFormData>({
    resolver: zodResolver(recordSchema)
  })

  const onSubmit = handleSubmit(async (formData) => {
    console.log("from", formData)
  })

  return (
    <div className='p-8 max-w-lg mx-auto '>
      <h2 className='text-xl font-semibold mb-6'>Create Record</h2>

      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <label htmlFor='title' className='block text-sm font-medium mb-2'>
            Title
          </label>
          <input
            id='title'
            type='text'
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
            {...register('importance_level')}
          >
            <option value=''>Select an importance level</option>
            <option value='One'>One</option>
            <option value='Two'>Two</option>
            <option value='Three'>Three</option>
          </select>
          {errors.importance_level && (
            <span className='text-red-500 text-sm'>
              {errors.importance_level.message}
            </span>
          )}
        </div>

        <button
          type='submit'
          className='w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
        >
          Submit
        </button>
      </form>
    </div>
  )
}
