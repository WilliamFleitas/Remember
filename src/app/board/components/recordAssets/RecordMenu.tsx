'use client'

import CustomMenu, { OptionsType } from '@/src/components/ui/menu/CustomMenu'
import { ClickEvent } from '@szhsin/react-menu'
import React, { useState } from 'react'
import { HiOutlineEllipsisVertical } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import UpdateRecordForm from '../UpdateRecordForm'
import { RecordType } from '@/src/globalTypes/globalTypes'
import CustomModal from '@/src/components/ui/modal/CustomModal'
import deleteRecordCall from '@/src/libs/apiRequests/record/deleteRecordCall'

const menuOptionsData = [
  {
    label: 'Edit',
    value: 'edit',
    id: '0'
  },
  {
    label: 'Delete',
    value: 'delete',
    id: '1'
  }
]

interface RecordMenuPropsType {
  recordData: RecordType
}
export default function RecordMenu ({
  recordData
}: RecordMenuPropsType): React.JSX.Element {
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const handleMenuChange = async (
    event: ClickEvent,
    rowData?: OptionsType
  ): Promise<void> => {
    if (rowData) {
      if (rowData.value === 'edit') {
        setModalIsOpen(true)
      } else if (rowData.value === 'delete') {
        const response = await deleteRecordCall({ id: recordData.id })
        console.log('delete response', response)
        router.refresh()
      }
    }
  }

  return (
    <div>
      <CustomMenu
        portal={true}
        ButtonBody={
          <span className='text-white hover:text-primary-decoration px-2 py-4 flex flex-col items-center text-center justify-center'>
            <HiOutlineEllipsisVertical className='w-5 h-5' />
          </span>
        }
        menuOnClick={handleMenuChange}
        optionsData={menuOptionsData}
        placeX='left'
        placeY='left'
        gap={-2}
        shift={42}
        viewScroll={'auto'}
        menuWidthSize='small'
        position={'auto'}
      />
      <CustomModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        modalContent={<UpdateRecordForm recordData={recordData} />}
      />
    </div>
  )
}
