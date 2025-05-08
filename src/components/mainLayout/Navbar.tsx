'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Third', path: '/third' },
  { name: 'Thor', path: '/thor' }
]

export default function Navbar () {
  const pathname = usePathname()

  return (
    <div className='flex flex-row w-full h-fit justify-between items-center px-8 py-4 shadow-md bg-red-400'>
      <Link href={'/'} className='text-xl font-semibold'>
        Remember
      </Link>
      <nav className='flex gap-6'>
        {navItems.map(item => (
          <Link
            key={item.path}
            href={item.path}
            className={`text-gray-700 hover:text-blue-500 transition-colors ${
              pathname === item.path ? 'text-blue-500 font-bold' : ''
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
