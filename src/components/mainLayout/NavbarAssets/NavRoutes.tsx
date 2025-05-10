'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'


const navItems = [
  { name: 'Board', path: '/board' },
  { name: 'About', path: '/about' },
  { name: 'Thor', path: '/thor' }
]

export default function NavRoutes () {
  const pathname = usePathname()
  const { isSignedIn } = useUser()

  if(!isSignedIn) return

  return (
    <nav className='flex flex-row text-start items-center justify-start gap-4'>
      {navItems.map(item => (
        <Link
          key={item.path}
          href={item.path}
          className={`font-semibold text-[1.1rem] hover:text-[#5f014f] transition-colors ${
            pathname === item.path ? 'text-[#5f014f] font-bold' : ''
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
