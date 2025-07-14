'use client'

import React, { JSX, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import StandardButton from '@/src/components/ui/button/StandardButton'

interface ButtonModalProps {
  buttonContent: string
  modalContent: JSX.Element
}

export default function ButtonModal ({
  buttonContent,
  modalContent
}: ButtonModalProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <StandardButton
        content={buttonContent}
        handleClick={() => setIsOpen(true)}
      />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'
      >
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4 bg-[#3a3a3a57]'>
          <DialogPanel className='max-w-lg space-y-4 border border-primary-decoration bg-primary-background px-6 py-4 min-w-[35rem] min-h-[10rem] rounded-md shadow-sm shadow-gray-700'>
            {modalContent}
            {/* <div className='flex gap-4'>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div> */}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
