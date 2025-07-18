'use client'

import React from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'

interface CustomModalProps {
  modalContent: React.JSX.Element
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CustomModal ({
  modalContent,
  isOpen,
  setIsOpen
}: CustomModalProps): React.JSX.Element {

  return (
    <>
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
