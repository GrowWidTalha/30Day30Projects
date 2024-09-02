import { CodeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
    <Link href="#" className="flex items-center justify-center" prefetch={false}>
      <CodeIcon className="h-6 w-6" />
      <span className="sr-only">30-Day 30-Projects</span>
    </Link>
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
        About
      </Link>
      <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
        Projects
      </Link>
      <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
        Leaderboard
      </Link>
      <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
        Community
      </Link>
    </nav>
  </header>
  )
}

export default Navbar
