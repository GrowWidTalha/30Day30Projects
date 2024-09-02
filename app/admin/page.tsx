import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ChallengeCard from "@/components/challengeCard"
import { PlusIcon } from "lucide-react"
import { getAllChallenges } from "@/actions/challenge.actions"
import { Challenge } from "@/lib/types.appwrite"

export default async function AdminPage() {
    const challenges: Challenge[] = await getAllChallenges()
    if(!challenges) return null;
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Coding Challenges</h1>
          <Button size="sm" asChild>
            <Link href={"/admin/create"} >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create New Challenge
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {challenges.map((challenge) => (
                <ChallengeCard key={challenge.$id} name={challenge.name} description={challenge.briefDescription} responses={challenge.numberOfResponses} id={challenge.$id} />
            ))}
        </div>
      </main>
    </div>
  )
}
