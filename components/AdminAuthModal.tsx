'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// Mock environment variable (in a real app, this would be server-side)
const MOCK_ADMIN_CODE = '123456'

export default function SecureAdminPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
const [error, setError] = useState("")
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (!storedToken) {
      setIsOpen(true)
    } else {
      setIsAdmin(true)
    }
  }, [])

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const handleSubmit = () => {
    if (code === MOCK_ADMIN_CODE) {
      localStorage.setItem('adminToken', 'true')
      setIsAdmin(true)
      setIsOpen(false)
      setError("")

    } else {
      setError("Invalid password try again!")
      setCode('')
    }
  }

  if (!isAdmin) {
    return (
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Authentication</DialogTitle>
            <DialogDescription>
              Please enter the 6-digit admin code to access the admin page.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <Input
            //   type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={code}
              onChange={handleCodeChange}
              placeholder="Enter 6-digit code"
              className="text-center"
            />
            {error && <p className='text-xs text-destructive'>{error}</p>}
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Page</h1>
//       <p>You have successfully authenticated as an admin.</p>
//       <Button
//         className="mt-4"
//         onClick={() => {
//           localStorage.removeItem('adminToken')
//           setIsAdmin(false)
//           setCode("")
//           setIsOpen(true)
//         }}
//       >
//         Logout
//       </Button>
//     </div>
//   )
}
