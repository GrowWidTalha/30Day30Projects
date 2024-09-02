import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { Challenge } from '@/lib/types.appwrite'

const TodayChallenge = ({challenge}: {challenge: Challenge}) => {
  return (
    <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-4">Today&apos;s Challenge</h2>
    <Card>
      <CardHeader>
        <CardTitle>{challenge.name}</CardTitle>
        <CardDescription>{challenge.DayNo}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{challenge.briefDescription}</p>
        <Link href={`/app/challenge/${challenge.$id}`} className="mt-4 inline-block bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90">
          Start Challenge
        </Link>
      </CardContent>
    </Card>
  </section>
  )
}

export default TodayChallenge
