import CreateRecordForm from '@/src/app/board/components/CreateRecordForm'
import CustomModal from '@/src/components/ui/modal/CustomModal'
import RecordCards from './components/RecordCards'

export default function Board () {
  return (
    <div className='px-8 py-4  w-full h-full flex flex-col text-start items-start justify-start gap-4'>
      <h1 className='font-bold w-fit h-fit leading-0 text-3xl! tracking-wide'>Records Page</h1>

      <CustomModal
        buttonContent='Create Record'
        modalContent={<CreateRecordForm />}
      />

      <RecordCards />

      {/* //agregar categoria de favoritos */}
    </div>
  )
}
