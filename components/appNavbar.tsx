'use client'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const NavLinks = () => (
    <>
      {/* <li><Link href="/app/leaderboard" className="text-foreground hover:text-primary">Leaderboard</Link></li> */}
      <li><Link href="/app/mysolutions" className="text-foreground hover:text-primary">My Solutions</Link></li>
      <li><UserButton /></li>
    </>
  )

  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex items-center justify-between">
          <li><Link href="/app" className="text-2xl font-bold text-primary">30 Day Coding Challenge</Link></li>
          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <ul className="flex flex-col space-y-4 mt-4">
                  <NavLinks />
                </ul>
              </SheetContent>
            </Sheet>
          ) : (
            <li>
              <ul className="flex items-center space-x-4">
                <NavLinks />
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default AppNavbar
