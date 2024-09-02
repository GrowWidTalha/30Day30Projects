
import AppNavbar from '@/components/appNavbar'
import Navbar from '@/components/navbar'
import React from 'react'

const AppLayout = ({children}: { children: React.ReactNode}) => {
  return (
    <div>
        <AppNavbar />
        {children}
    </div>
  )
}

export default AppLayout
