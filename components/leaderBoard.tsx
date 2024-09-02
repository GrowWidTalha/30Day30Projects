'use client'

import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '@clerk/nextjs'
import { getUserById } from '@/actions/auth.actions'
import { User } from '@clerk/nextjs/server'

interface RankedUser {
  userId: string
  rank: number
  totalSubmissions: number
  averageSubmissionTime: number
  latestSubmission: Date
}

interface UserLeaderboardProps {
  rankedUsers: RankedUser[]
}

interface UserData {
  username: string
  imageUrl: string
}

export default function UserLeaderboard({ rankedUsers }: UserLeaderboardProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortedUsers, setSortedUsers] = useState<RankedUser[]>(rankedUsers)
  const { user: currentUser } = useUser()

  useEffect(() => {
    setSortedUsers([...rankedUsers].sort((a, b) =>
      sortOrder === 'asc' ? a.rank - b.rank : b.rank - a.rank
    ))
  }, [rankedUsers, sortOrder])

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Leaderboard</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" onClick={toggleSortOrder} className="font-semibold">
                  Rank
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Submissions</TableHead>
              <TableHead className="text-right">Avg. Submission Time</TableHead>
              <TableHead className="text-right">Latest Submission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((userStat) => (
              <TableRow key={userStat.userId} className={currentUser?.id === userStat.userId ? "bg-muted" : ""}>
                <TableCell className="font-medium">{userStat.rank}</TableCell>
                <UserCell userId={userStat.userId} />
                <TableCell>{userStat.totalSubmissions}</TableCell>
                <TableCell className="text-right">
                  {Math.round(userStat.averageSubmissionTime / (1000 * 60 * 60))} hours
                </TableCell>
                <TableCell className="text-right">
                  {userStat.latestSubmission.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function UserCell({ userId }: { userId: string }) {
  const [userData, setUserData] = useState<User | undefined>(undefined)

  useEffect(() => {
    const fetchUserDetails = async () => {
        const user = await getUserById(userId)
        setUserData(user)
    }

    fetchUserDetails()
  }, [userId])

  if (!userData) {
    return <TableCell>Loading...</TableCell>
  }

  return (
    <TableCell>
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={userData.imageUrl} alt={userData.username} />
          <AvatarFallback>{userData?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span>{userData.username}</span>
      </div>
    </TableCell>
  )
}
