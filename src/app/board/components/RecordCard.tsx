
import { RecordType } from '@/src/globalTypes/globalTypes'
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
      className='flex flex-col grow w-full fh:w-1/4 h-fit bg-tertiary-background rounded-md fh:min-w-[28rem] border border-secondary-border/50  overflow-hidden isolate' style={{
        boxShadow: '2px 10px 15px #0000008c'
      }}
    >
      <div className='flex flex-row w-full h-fit text-start items-start justify-between'>
        <div className='flex flex-col w-1/2 grow h-fit bg-transparent px-6 py-4 rounded-br-xl rounded-bl-xl rounded-tr-xl rounded-tl-sm gap-3 border border-secondary-border/10' style={{
        boxShadow: 'inset 2px 15px 20px #0000008c'
      }}>
          <h2 className='capitalize font-bold tracking-wider text-xxl! p-0 m-0 break-words truncate'>
            {recordData.title}
          </h2>
          <p className='flex capitalize italic text-xl! text-zinc-300'>{`" `} <span className=' break-words truncate flex'>{recordData.description}</span> {` "`}</p>
        </div>

        <div className='flex flex-col w-fit pr-2'>
          <RecordMenu recordData={recordData} />
        </div>
      </div>

      <div className='w-full h-fit flex flex-row px-6 py-4 text-start items-center justify-between'>
        <ImportanceLevel importance_level={recordData.importance_level} />
        <small>{recordDate}</small>
      </div>
    </li>
  )
}
