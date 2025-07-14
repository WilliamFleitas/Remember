'use server'

import { RecordCategoryType } from '@/src/globalTypes/globalTypes'
import RecordsSliderContainer from './recordAssets/RecordsSliderContainer'

interface BoardCategoriesPropsType {
  categoriesData: RecordCategoryType[]
}
export default async function BoardCategories ({
  categoriesData
}: BoardCategoriesPropsType) {
  console.log('slad', categoriesData)

  return (
    <article className='flex flex-col w-full h-fit text-start items-start justify-start gap-4'>
      <div className=' px-8'>
        <h2 className='font-bold w-fit h-fit text-3xl! tracking-wide'>
          Categories{' '}
        </h2>
      </div>
      <div
        className='flex flex-col w-full h-fit text-start items-start justify-start rounded-md  bg-primary-background border-y border-secondary-border/10 pt-4 pb-6  px-6'
        style={{
          boxShadow: 'inset 5px 10px 20px #0000008c'
        }}
      >
        <div className='flex flex-col w-full h-fit text-start items-start justify-start gap-4'>
          {categoriesData.length ? (
            categoriesData.map(category => (
              <RecordsSliderContainer
                categoryData={category}
                key={category.id}
              />
            ))
          ) : (
            <></>
          )}
          <RecordsSliderContainer favorite={true} />
        </div>
      </div>
    </article>
  )
}
