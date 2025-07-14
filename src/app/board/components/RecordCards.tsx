'use server'

import { getUserRecords } from '@/src/libs/server/getUserRecords'
import { redirect } from 'next/navigation'
import RecordCard from './RecordCard'

export default async function RecordCards () {
  const recordsData = await getUserRecords()

  if (!recordsData.success) {
    if (recordsData.error === 'Unauthorized') {
      return redirect('/')
    }
    return (
      <div>
        <strong>Upss, there was an error: {recordsData.error}</strong>
      </div>
    )
  }

  return (
    <ul
      className='flex flex-row flex-wrap w-full text-start items-center justify-between gap-4 min-h-[23.45rem] max-h-[23.45rem] overflow-y-auto py-6 px-8 border border-secondary-border/10 rounded-tr-md rounded-b-md no-scrollbar'
      style={{
        boxShadow: 'inset 5px 10px 20px #0000008c'
      }}
    >
      {recordsData.data.length ? (
        recordsData.data.map(record => (
          <RecordCard key={record.id} recordData={record} />
        ))
      ) : (
        <li>
          <span>Nothing to see here! Create your new Record!</span>
        </li>
      )}
    </ul>
  )
}
