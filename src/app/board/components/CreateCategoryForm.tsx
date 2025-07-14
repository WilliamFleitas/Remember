'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import createCategoryCall from '@/src/libs/apiRequests/category/createCategoryCall'

const categorySchema = z.object({
  name: z.string().trim().min(5, 'Name is required, min 5 char')
})

type CategoryFormData = z.infer<typeof categorySchema>

export default function CreateCategoryForm () {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema)
  })

  const onSubmit = handleSubmit(
    async ({ name }) => {
      try {
        const response = await createCategoryCall({
          name
        })

        if (!response.success) {
          throw Error(response.error)
        } else {
          console.log(
            'Category creada, hay que actualizar la lista',
            response
          )
          router.refresh()
        }
      } catch (error) {
        console.log('error', error)
      }
    }
  )

  return (
    <div className='p-8 max-w-lg mx-auto '>
      <h2 className='text-xl font-semibold mb-6'>Create Category</h2>

      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-sm font-medium mb-2'>
            Name
          </label>
          <input
            id='name'
            type='text'
            className={`w-full p-2 border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
            {...register('name')}
          />
          {errors.name && (
            <span className='text-red-500 text-sm'>{errors.name.message}</span>
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
