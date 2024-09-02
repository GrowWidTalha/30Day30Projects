import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { Challenge } from '@/lib/types.appwrite'
import { Button } from './ui/button'

const ChallengeCardUser = ({challenge}: {challenge: Challenge}) => {
  return (
    <Card key={challenge.id}>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle>{challenge.name}</CardTitle>
                  <p>{challenge.DayNo}</p>
                </CardHeader>
                <CardContent>
                <CardDescription className='mb-4'>{challenge.briefDescription}</CardDescription>
                  <div className='flex w-full justify-end'>
                    <Button variant={"outline"}>
                      <Link href={`/app/challenge/${challenge.$id}`}>
                        View Challenge
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
  )
}

export default ChallengeCardUser
