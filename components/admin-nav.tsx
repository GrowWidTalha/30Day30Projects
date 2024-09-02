import { CodeIcon } from 'lucide-react'
import Link from 'next/link'

import React from 'react'

const AdminNav = () => {
  return (
    <header className="bg-background border-b mb-5 px-4 py-3 flex items-center justify-between sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2">
            <CodeIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Coding Challenges</span>
          </Link>
        </div>
      </header>
  )
}

export default AdminNav
