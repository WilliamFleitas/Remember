import React from 'react'

interface StandardButtonProps {
  content: string
  handleClick: () => void
  buttonType?: "submit" | "button" 
}

export default function StandardButton ({
  content,
  buttonType = "button",
  handleClick
}: StandardButtonProps): React.JSX.Element {
  return (
    <button
      type={buttonType}
      onClick={handleClick}
      className='flex flex-row w-fit border px-4 py-2'
    >
      {content}
    </button>
  )
}
