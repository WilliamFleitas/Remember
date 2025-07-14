'use server'

import CreateRecordForm from '@/src/app/board/components/CreateRecordForm'
import ButtonModal from '@/src/components/ui/modal/ButtonModal'
import RecordCards from './components/RecordCards'
import { redirect } from 'next/navigation'
import BoardCategories from './components/BoardCategories'
import CreateCategoryForm from './components/CreateCategoryForm'
import { getRecordCategories } from '@/src/libs/server/getRecordCategories'

export default async function Board () {
  const categoriesData = await getRecordCategories()

  if (!categoriesData.success) {
    if (categoriesData.error === 'Unauthorized') {
      return redirect('/')
    }

    return (
      <div>
        <strong>Upss, there was an error: {categoriesData.error}</strong>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col text-start items-start justify-start gap-4 overflow-y-auto no-scrollbar'>
      <div className='flex flex-col w-full h-fit text-start items-start justify-start'>
        <h1 className='font-bold w-fit h-fit leading-0 text-3xl! tracking-wide  pb-4  px-8 '>
          Records Page
        </h1>
        <div
          className='border border-secondary-border/10 flex flex-row w-fit h-fit text-start items-start justify-start px-8 gap-4 py-4 rounded-t-md'
          style={{
            boxShadow: 'inset 5px 5px 10px #0000008c'
          }}
        >
          <ButtonModal
            buttonContent='Create Record'
            modalContent={<CreateRecordForm />}
          />
          <ButtonModal
            buttonContent='Create Category'
            modalContent={<CreateCategoryForm />}
          />
        </div>
        <RecordCards />
      </div>
      <BoardCategories categoriesData={categoriesData.data} />
      {/* //agregar categoria de favoritos */}
    </div>
  )
}
