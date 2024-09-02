import ProgressBar from '@/app/progressBar'
import ChallengeCardUser from '@/components/ChallengeCardUser'
import { getAllChallenges } from '@/actions/challenge.actions'
import { Challenge } from '@/lib/types.appwrite'
import TodayChallenge from '@/components/todayChallenge'
import isToday from "dayjs/plugin/isToday"
import dayjs from 'dayjs'
import { getAllResponsesBYUserId } from '@/actions/answers.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

dayjs.extend(isToday);

export default async function HomePage() {
    const challenges: Challenge[] = await getAllChallenges();
    const user = await currentUser()
    if(!user) redirect("/")
    const responses = await getAllResponsesBYUserId(user.id)
    const todayDate = new Date().toISOString().split('T')[0];

    const todayChallenge = challenges.find((challenge) => {
        // Use dayjs to check if the startDate is today
        return dayjs(challenge.startDate).isToday();
      });

      console.log(todayChallenge);
    //   console.log(challenges[0])
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Your 30 Day Coding Journey</h1>
          <ProgressBar numberOfResponses={responses.total}/>
        </section>

       {todayChallenge && <TodayChallenge challenge={todayChallenge!} />}

        <section>
          <h2 className="text-2xl font-semibold mb-4">All Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <ChallengeCardUser key={challenge.$id} challenge={challenge} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
