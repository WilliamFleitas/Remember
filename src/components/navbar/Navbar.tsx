import Link from 'next/link'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import NavRoutes from './NavRoutes'

export default function Navbar () {
  return (
    <header
      className='flex flex-row w-full h-fit justify-between items-center px-8 py-4 rounded-md border border-secondary-border/10'
      style={{
        boxShadow: 'inset 5px 5px 20px #0000008c'
      }}
    >
      <Link href={'/'} className='text-4xl font-black tracking-wider'>
        Remember
      </Link>

      <NavRoutes />

      <div className='flex flex-row text-start items-center justify-start gap-4'>
        <SignedOut>
          <SignInButton mode='modal' />
          <SignUpButton mode='modal' />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
