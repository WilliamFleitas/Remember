import Link from 'next/link'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import NavRoutes from './NavbarAssets/NavRoutes'

export default function Navbar () {
  return (
    <header className='flex flex-row w-full h-fit justify-between items-center px-8 py-4 shadow-md border-b border-b-primary-decoration'>
      <Link href={'/'} className='text-[1.5rem] font-bold'>
        Remember
      </Link>
      
      <NavRoutes/>

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
