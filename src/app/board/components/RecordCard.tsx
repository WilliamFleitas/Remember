import { RecordType } from '@/src/app/globalTypes/globalTypes'
import ImportanceLevel from '@/src/components/ui/importanceLevel/ImportanceLevel'
import dayjs from 'dayjs'
import RecordMenu from './recordAssets/RecordMenu'

interface RecordCardPropsType {
  recordData: RecordType
}

export default function RecordCard ({
  recordData
}: RecordCardPropsType): React.JSX.Element {
  const recordDate = dayjs(recordData.createdAt).format('DD MMM - YY')

  return (
    <li
      key={recordData.id}
      className='flex flex-col w-full h-fit bg-tertiary-background rounded-md min-w-[30rem] max-w-[30rem] border border-secondary-border overflow-hidden isolate'
    >
      <div className='flex flex-row w-full h-fit '>

        <div className='flex flex-col w-full h-fit bg-transparent nd px-6 py-4 rounded-br-xl rounded-bl-xl rounded-tr-xl rounded-tl-sm gap-3 border-b border-r border-secondary-border shadow shadow-primary-border'>
          <h2 className='capitalize font-bold tracking-wider text-xxl! p-0 m-0'>
            {recordData.title}
          </h2>
          <p className='capitalize italic text-xl! text-zinc-300'>{`" ${recordData.description} "`}</p>
        </div>

        <div className='pr-2'>
          <RecordMenu />
        </div>
  
      </div>
  
      <div className='w-full h-fit flex flex-row px-6 py-4 text-start items-center justify-between'>
        <ImportanceLevel importance_level={recordData.importance_level} />
        <small>{recordDate}</small>
      </div>
    </li>
  )
}
