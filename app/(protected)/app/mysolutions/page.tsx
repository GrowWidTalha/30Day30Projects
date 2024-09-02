import { getAllResponsesBYUserId } from '@/actions/answers.actions'
import ResponseCard from '@/components/ResponseCard'
import { Answers } from '@/lib/types.appwrite'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const MySolutionsPage = async () => {
  const user = await currentUser()
  if (!user) redirect("/")
  const solutions: { documents: Answers[], total: number } = await getAllResponsesBYUserId(user?.id)

  if (!solutions) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  )

  if (solutions?.total === 0) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">No Solutions Found</h1>
      <p className="text-muted-foreground">You haven&apos;t submitted any solutions yet. Start coding and come back to see your progress!</p>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Solutions</h1>
      <p className="text-muted-foreground mb-6">Here are all the coding challenges you&apos;ve tackled so far.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.documents.map((solution) => (
          <div key={solution.$id} className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <ResponseCard answer={solution} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MySolutionsPage
