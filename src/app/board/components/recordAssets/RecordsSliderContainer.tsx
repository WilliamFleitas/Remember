'use server'
import { RecordCategoryType } from '@/src/globalTypes/globalTypes'
import { getUserRecords } from '@/src/libs/server/getUserRecords'
import RecordsSlider from './RecordsSlider'

interface SliderContainerPropsType {
  categoryData?: RecordCategoryType
  favorite?: boolean
}

export default async function RecordsSliderContainer ({
  categoryData,
  favorite
}: SliderContainerPropsType) {
  const queryObj: {
    categoryId?: string
    favorite?: boolean
  } = {}
  if (categoryData !== undefined) {
    queryObj.categoryId = categoryData.id
  } else if (favorite !== undefined && favorite) {
    queryObj.favorite = true
  }

  const recordsData = await getUserRecords(queryObj)
  console.log('recos', recordsData)
  if (!recordsData.success) {
    return (
      <div>
        <strong>Upss, there was an error: {recordsData.error}</strong>
      </div>
    )
  }


  if (!recordsData.data.length) {
    return
  }


  return (
    <div className='flex flex-col w-full h-fit text-start items-start justify-start'>
      <h2 className='font-bold w-fit h-fit text-2xl! tracking-wide pt-2 px-2'>
        {categoryData === undefined ? 'Favorites' : categoryData.name}
      </h2>
      <RecordsSlider recordData={recordsData.data} />
    </div>
  )
}
