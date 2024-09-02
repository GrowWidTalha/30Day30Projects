import AdminNav from '@/components/admin-nav'
import AdminAuthModal from '@/components/AdminAuthModal'
import React from 'react'

const layout = ({ children } : {children: React.ReactNode}) => {
  return (
    <div>
        <AdminNav />
        {children}
        <AdminAuthModal />
    </div>
  )
}

export default layout
