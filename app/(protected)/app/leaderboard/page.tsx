import { getAllResponses } from '@/actions/answers.actions'
import UserLeaderboard from '@/components/leaderBoard'
import { Answers } from '@/lib/types.appwrite'

interface UserStats {
  userId: string
  totalSubmissions: number
  averageSubmissionTime: number
  latestSubmission: string // Changed to string
  rank: number
}

export default async function LeaderboardPage() {
  const answers: Answers[] = await getAllResponses()

  // Calculate user stats and rankings
  const userStats = answers.reduce<Record<string, Omit<UserStats, 'rank'>>>((acc, answer) => {
    if (!acc[answer.userId]) {
      acc[answer.userId] = {
        userId: answer.userId,
        totalSubmissions: 0,
        averageSubmissionTime: 0,
        latestSubmission: '',
      }
    }
    acc[answer.userId].totalSubmissions++
    const submissionTime = new Date(answer.$createdAt).getTime() - new Date(answer.challenge.startDate).getTime()
    acc[answer.userId].averageSubmissionTime =
      (acc[answer.userId].averageSubmissionTime * (acc[answer.userId].totalSubmissions - 1) + submissionTime) /
      acc[answer.userId].totalSubmissions

    const currentSubmissionDate = new Date(answer.$createdAt)
    const latestSubmissionDate = acc[answer.userId].latestSubmission
      ? new Date(acc[answer.userId].latestSubmission)
      : new Date(0)

    if (currentSubmissionDate > latestSubmissionDate) {
      acc[answer.userId].latestSubmission = currentSubmissionDate.toISOString()
    }

    return acc
  }, {})

  const rankedUsers: UserStats[] = Object.values(userStats)
    .sort((a, b) => {
      if (a.totalSubmissions !== b.totalSubmissions) {
        return b.totalSubmissions - a.totalSubmissions
      }
      return a.averageSubmissionTime - b.averageSubmissionTime
    })
    .map((user, index) => ({ ...user, rank: index + 1 }))

  return <UserLeaderboard rankedUsers={rankedUsers} />
}
