import CreateRecordForm from '@/src/components/Records/CreateRecordForm'
import CustomModal from '@/src/components/ui/modal/CustomModal'

export default function Board () {
  return (
    <div className='p-4 w-full h-full flex flex-col text-start items-start justify-start'>
      <strong>this is the board page</strong>

      <CustomModal
        buttonContent='Create Record'
        modalContent={<CreateRecordForm />}
      />
    </div>
  )
}
