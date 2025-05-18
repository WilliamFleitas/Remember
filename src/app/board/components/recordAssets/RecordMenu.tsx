'use client'

import CustomMenu from '@/src/components/ui/menu/CustomMenu'
import { useState } from 'react'
import { HiOutlineEllipsisVertical } from 'react-icons/hi2'

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

export default function RecordMenu () {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const handleMenuChange = (event, item) => {
    console.log('asdasD2', event, item)
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
        position={"auto"}
      />
    </div>
  )
}
