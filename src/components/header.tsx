import { projects, profile, settings } from '@/app/links'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { NavigationLinks } from './navbar/NavigationLinks'

const Header = () => {
  return (
    <nav className="flex flex-row h-16 bg-emerald-800 items-center just">
      <Link href={'/projects'} className="w-1/2 p-5 shrink">
        <h1>TeamENV</h1>
      </Link>
      <NavigationLinks />
      <div className="p-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  )
}

export default Header
